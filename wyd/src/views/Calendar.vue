<template>
    <nav class="navbar_home">
    <ul class="navbar-nav">
        <li class="nav-item">
            <router-link to="/" class="nav-link">
            <i class="fas fa-house fa-2x" />
            <span class="link-text" >
                    Home
            </span>
            </router-link>
        </li>

        <li class="nav-item">
            <router-link to="/Calendar" class="nav-link">
            <i class="fas fa-calendar-days fa-2x" />
            <span class="link-text" >
                    Calendar
            </span>
            </router-link>
        </li>

        <li class="nav-item">
            <router-link to="/SpendingDashboard" class="nav-link">
            <i class="fas fa-sack-dollar fa-2x" />
            <span class="link-text" >
                    Spendings
            </span>
            </router-link>
        </li>

        <li class="nav-item">
            <router-link to="/FocusTimer" class="nav-link">
            <i class="fas fa-stopwatch fa-2x" />
            <span class="link-text" >
                    Timer
            </span>
            </router-link>
        </li>

        <li class="nav-item">
            <a href="#" class="nav-link">
            <span @click="googleSignOut">
                <i class="fas fa-right-from-bracket fa-2x" @click="googleSignOut"></i>
            </span>
            </a>
        </li>

    </ul>
    </nav>
    <div style="margin-left:6rem">
        <div class="scheduler-title">Doctor's Appointment
            <div class="row pt-3 justify-content-center">
                <div class="col col-2"></div>
                <div class="col col-8">
                    <ejs-schedule currentView="Month"
                    :eventSettings="appointmentData"
                    :selectedDate="schedulerSelectedDate"
                    ref="schedulerObject">
                    </ejs-schedule>
                </div>
            </div>
            <div class="treeview-title">Common Task List
                <div class="treeview-component">
                    <ejs-treeview :fields="treeviewFields" 
                    :allowDragAndDrop='true'
                    :nodeDragStop="onTreeDragStop"
                    ref="treeviewObject">
                    </ejs-treeview>
                </div>
                </div>
                <div class="col col-2"></div>
        </div>
    </div>
</template>

<script>

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import { getAuth, signOut } from '@firebase/auth';

//EXPORTS
export default {
    name: 'Calendar',
    components: {
    'ejs-schedule': ScheduleComponent,
    'ejs-treeview': TreeViewComponent,

    },

    provide : {
        schedule: [Day, Week, WorkWeek, Month, Agenda]
    },
    data() {
    return {
      draggedItemId : null,   
      treeviewFields: { 
        dataSource: [
          {Id: 1, Name: 'WADII'},
          {Id: 2, Name: 'CT'},
          {Id: 3, Name: 'BPAS'},
          {Id: 4, Name: 'IDP'},
          {Id: 5, Name: 'Feed Dog'}
        ],
        id:'Id', text:'Name'
      },
      schedulerSelectedDate : new Date(),
      appointmentData : {
         dataSource : [
             {
              Id : 1,
              Subject : 'Learn Thai',
              StartTime: new Date(2022, 10, 5, 8, 0, 0),
              EndTime: new Date(2022, 10, 6, 9, 0, 0)
            },
            {
              Id : 2,
              Subject : 'WAD Help',
              StartTime: new Date(2022, 10, 8, 10, 0, 0),
              EndTime: new Date(2022, 10, 8, 11, 30, 0)
            }
         ]
      }
    };
  },
  methods : {
    onTreeDragStop : function(args) {
      args.cancel = true;
      let schedulerComponentObject = this.$refs.schedulerObject.ej2Instances;
      let cellData = schedulerComponentObject.getCellDetails(args.target);
      let treeviewComponentObject = this.$refs.treeviewObject.ej2Instances;
      let filteredData = treeviewComponentObject.fields.dataSource.filter(function (item) { return item.Id === parseInt(args.draggedNodeData.id); });
      let eventData = {
        Subject : filteredData[0].Name,
        StartTime : cellData.startTime,
        EndTime : cellData.endTime,
        IsAllDay : cellData.isAllDay
      };
      //schedulerComponentObject.addEvent(eventData);
      schedulerComponentObject.openEditor(eventData,'Add',true);
    },
    googleSignOut() {
          const auth = getAuth();
          signOut(auth).then(() => {
          // Sign-out successful.
          alert("Successful Sign Out")
          console.log(getAuth().currentUser)
          location.reload()
          }).catch((error) => {
          // An error happened.
          console.log(error)
          });
        },
  }
}
</script>

<style>

@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';


</style>


<!-- <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
<script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script> -->

// how to move the top two scripts into "external.js"?
