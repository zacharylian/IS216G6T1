<template>
    <navbar></navbar>
    <div style="margin-left:6rem">
        <div class="d-flex row pt-3">
            <div class="col-2">
                <div class="treeview-title">Common Task List
                    <div class="treeview-component mx-auto">
                        <ejs-treeview :fields="treeviewFields" 
                        :allowDragAndDrop='true'
                        :nodeDragStop="onTreeDragStop"
                        ref="treeviewObject">
                        </ejs-treeview>
                    </div>
                </div>
            </div>
            <div class="col-10">
                <div class=" col-10 d-flex mx-auto" >
                    <ejs-schedule height="150%" width="100%" currentView="Month"
                    :eventSettings="appointmentData"
                    :selectedDate="schedulerSelectedDate"
                    :dragStart="onDragStart"
                    :resizeStart="onResizeStart"
                    allowMultiDrag='true'
                    ref="schedulerObject"
                    :group="groupResource">
                        <e-resources>
                            <e-resource
                            :dataSource="prioDatasource"
                            field="PriorityId" 
                            title="Priority Level"
                            name="Priority"
                            textField="prioName"
                            idField="prioId"
                            colorField="color"> 
                            </e-resource>
                            <!-- <e-resource 
                            :dataSource="modDatasource" 
                            field="modId"
                            title="Mod Details"
                            name="Modules"
                            textField="modName"
                            idField="modId"
                            colorField="color"
                            allowMultiple="true"></e-resource> -->
                        </e-resources>
                    </ejs-schedule>
                </div>
            </div>
        </div>
        <div>Appointment Data: {{appointmentData}}</div>

        
    </div>
</template>

<script>
import navbar from '@/components/layouts/new_navbar.vue';
import { getAuth, signOut } from '@firebase/auth';
import {appointmentData} from '@/data.js';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, ResourcesDirective, ResourceDirective, HeaderRowDirective, HeaderRowsDirective} from '@syncfusion/ej2-vue-schedule';
import {DataManager, WebApiAdaptor} from "@syncfusion/ej2-data";
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-treegrid';
import { directive } from '@babel/types';

// import {sampleData} from '@/data.js'



// for remote data binding
var remoteData = new DataManager({
    url: "https://ej2services.syncfusion.com/production/web-services/api/Schedule",
    adaptor: new WebApiAdaptor,
    crossDomain: true
})

//EXPORTS
export default {
    name: 'Calendar',
    components: {
    "navbar" : navbar,
    'ejs-schedule': ScheduleComponent,
    'ejs-treeview': TreeViewComponent,
    'e-resources' : ResourcesDirective,
    'e-resource' : ResourceDirective,
    'e-header-rows' : HeaderRowsDirective,
    'e-header-row' : HeaderRowDirective,
    'ejs-treegrid' : TreeGridComponent,
    'e-columns' : ColumnsDirective,
    'e-column' : ColumnDirective

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
    // modDatasource:[
    //     {modName: 'WAD', modId:1, color: 'blue', taskPrioId:1 },
    //     {modName: 'IDP', modId:2, color: 'purple', taskPrioId:2},
    //     {modName: 'BPAS', modId:3, color: 'orange', taskPrioId:2}
    // ],
    groupResource : {
        byDate: true,
        byGroupID: false,
        resources : ["Priority"]
    },
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

    //   appointmentData : {
    //      dataSource : remoteData
    //   },
    appointmentData : {
        dataSource : [
            {
                Id : 1,
                Subject : 'Learn Thai',
                StartTime: new Date(2022, 10, 5, 8, 0, 0),
                EndTime: new Date(2022, 10, 6, 9, 0, 0),
                PriorityId : 1,
            },
            {
                Id : 2,
                Subject : 'WAD Help',
                StartTime: new Date(2022, 10, 8, 10, 0, 0),
                EndTime: new Date(2022, 10, 8, 11, 30, 0),
                PriorityId : 2,
            },
            {
                Id : 3,
                Subject : 'Mtg',
                StartTime: new Date(2022, 10, 11, 12, 0, 0),
                EndTime: new Date(2022, 10, 11, 13, 30, 0),
                PriorityId : 3,
            }
        ]
    },

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
    SchedulerComponentObject.openEditor(eventData,'Add',true);
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
@import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import "../../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-treegrid/styles/material.css";

.e-treegrid .e-rowcell.customcss{
    background-color: #ecedee;
    font-family: 'Bell MT';
    color: 'red';
    font-size: '20px';
}

.e-treegrid .e-headercell.customcss{
    background-color: #B19CD9;
    color: white;
    font-family: 'Bell MT';
    font-size: '20px';
}
</style>
