<template>
    <navigation-bar />
    <div :style="{'margin-left': navbarWidth}">
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
import {open, toggleNavbar, navbarWidth} from '@/components/layouts/state';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import navBar from '@/components/layouts/navbar.vue';


//EXPORTS
export default {
    name: 'Calendar',
    components: {
    'ejs-schedule': ScheduleComponent,
    'ejs-treeview': TreeViewComponent,
    'navigation-bar': navBar,
    },
    setup() {
    return {open, toggleNavbar, navbarWidth}
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


<!-- <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
<script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script> -->

// how to move the top two scripts into "external.js"?
