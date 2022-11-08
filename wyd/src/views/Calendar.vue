<template>
    <nav class="navbar_main">
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
                    :dragStart="onDragStart"
                    :resizeStart="onResizeStart"
                    allowMultiDrag='true'
                    ref="schedulerObject">
                        <e-resources>
                            <e-resource
                            :dataSource="prioDatasource"
                            field="PriorityId"
                            title="Priority Level"
                            name="Priority Level"
                            textField="prioName"
                            idField="prioId"
                            colorField="color"> 
                            </e-resource>
                        </e-resources>
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
import {open, toggleNavbar, navbarWidth} from '@/components/layouts/state';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, ResourcesDirective, ResourceDirective } from '@syncfusion/ej2-vue-schedule';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import navBar from '@/components/layouts/navbar.vue';


//EXPORTS
export default {
    name: 'Calendar',
    components: {
    'ejs-schedule': ScheduleComponent,
    'ejs-treeview': TreeViewComponent,
    'e-resources' : ResourcesDirective,
    'e-resource' : ResourceDirective,
    'navigation-bar': navBar,
    },
    setup() {
    return {open, toggleNavbar, navbarWidth}
    },
    provide : {
        schedule: [Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]
    },
    data() {
    return {  
    prioDatasource: [
        {prioName: 'High-Priority', prioId: 1, color: '#B81D13'},
        {prioName: 'Mid-Priority', prioId: 2, color: '#EFB700'},
        {prioName: 'Low-Priority', prioId: 3, color: '#008450'}
    ],
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
              EndTime: new Date(2022, 10, 6, 9, 0, 0),
              PriorityId : 1
            },
            {
              Id : 2,
              Subject : 'WAD Help',
              StartTime: new Date(2022, 10, 8, 10, 0, 0),
              EndTime: new Date(2022, 10, 8, 11, 30, 0),
              PriorityId : 2
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
    onDragStart : function (args) {
        args.excludeSelectors = 'e-header-cells,e-all-day-cells';
        args.navigation.enable = true;
        args.interval = 1, 
        args.scroll = {
            enable : true,
            scrollBy : 4,
            timeDelay : 100
        }
    },
    onResizeStart : function (args) {
        args.interval = 1, 
        args.scroll = { 
            enable : true,
            scrollBy : 4,
            timeDelay : 100
        }
    }
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
