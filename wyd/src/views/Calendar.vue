<template>
    <navbar></navbar>
    <div style="margin-left:6rem">
        <div class="d-flex row pt-3">
            <div class="col-2">
                <div class="treeview-title">Common Task List
                    <div class="treeview-component mx-auto">
                        <ejs-treeview id="treeview"
                        :fields="treeviewFields" 
                        :allowDragAndDrop='true'
                        :nodeDragStop="onTreeDragStop"
                        ref="treeviewObject">
                        </ejs-treeview>
                    </div>
                </div>
            </div>
            <div class="col-10">
                <div class=" col-10 d-flex mx-auto" >
                    <tr>
                    <td>
                        <div>
                            <ejs-button v-on:click.native='onSubmit'>Add</ejs-button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <ejs-button v-on:click.native='onSave'>Edit</ejs-button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <ejs-button v-on:click.native='onDelete'>Delete</ejs-button>
                        </div>
                    </td>
                </tr><br>
                    <ejs-schedule height="150%" width="100%" currentView="Month"
                    id='Schedule'
                    :eventSettings="appointmentData"
                    :selectedDate="schedulerSelectedDate"
                    :dragStart="onDragStart"
                    :resizeStart="onResizeStart"
                    allowMultiDrag='true'
                    ref="schedulerObject"
                    :group="groupResource"
                    :cellClick='onCellClick'
                    :eventClick='onEventClick'
                    :editorTemplate="'schedulerEditorTemplate'">
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
                        <template v-slot:schedulerEditorTemplate="{}">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="e-textlabel">
                                            Summary
                                        </td>
                                        <td colspan="4">
                                            <input class="e-field e-input" type="text" name="Subject"/>
                                            <!-- e-field and name need to be same -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="e-textlabel">
                                            Priority Level
                                        </td>
                                        <td colspan="4">
                                            <ejs-dropdownlist class="e-field" placeholder="Choose Priority"
                                            :dataSource="prioHardCodedDataSource" name="PriorityId">

                                            </ejs-dropdownlist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="e-textlabel">
                                            From
                                        </td>
                                        <td colspan="4">
                                            <ejs-datetimepicker class="e-field" name="StartTime">

                                            </ejs-datetimepicker>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="e-textlabel">
                                            To
                                        </td>
                                        <td colspan="4">
                                            <ejs-datetimepicker class="e-field" name="EndTime">

                                            </ejs-datetimepicker>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="e-textlabel">
                                            Description
                                        </td>
                                        <td colspan="4">
                                            <input class="e-field e-input" type="text" name="Description" />
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </template>
                    </ejs-schedule>
                </div>
            </div>
        </div>
        <div>Events: {{appointmentData.dataSource}}</div>

        
    </div>
</template>

<script>
import navbar from '@/components/layouts/new_navbar.vue';
import { getAuth, signOut } from '@firebase/auth';
import {appointmentData} from '@/data.js';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, ResourcesDirective, ResourceDirective, HeaderRowDirective, HeaderRowsDirective} from '@syncfusion/ej2-vue-schedule';
import {DataManager, WebApiAdaptor} from "@syncfusion/ej2-data";
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-treegrid';
import { directive } from '@babel/types';
import { getDatePredicate } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'en-US': {
        'schedule' : {
            'saveButton': 'Add',
            'cancelButton': 'Close',
            'newEvent': 'Add Event'
        }
    }
})

// for remote data binding
// var remoteData = new DataManager({
//     url: "https://ej2services.syncfusion.com/production/web-services/api/Schedule",
//     adaptor: new WebApiAdaptor,
//     crossDomain: true
// })

//EXPORTS
export default {
    name: 'Calendar',
    components: {
    "navbar" : navbar,
    'ejs-datetimepicker': DateTimePickerComponent,
    'ejs-dropdownlist' : DropDownListComponent,
    'ejs-schedule': ScheduleComponent,
    'ejs-treeview': TreeViewComponent,
    'e-resources' : ResourcesDirective,
    'e-resource' : ResourceDirective,
    'e-header-rows' : HeaderRowsDirective,
    'e-header-row' : HeaderRowDirective,
    'ejs-treegrid' : TreeGridComponent,
    'e-columns' : ColumnsDirective,
    'e-column' : ColumnDirective,
    "ejs-button": ButtonComponent, 

    },

    provide : {
        schedule: [Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]
    },
    data() {
    return {  
    // data: appointmentData,


    prioHardCodedDataSource: ['High-Priority', 'Mid-Priority', 'Low-Priority'],
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
        enableTooltip: true,
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
                StartTime: new Date(2022, 10, 8, 8, 0, 0),
                EndTime: new Date(2022, 10, 8, 9, 0, 0),
                PriorityId : 2,
            },
            {
                Id : 3,
                Subject : 'Mtg',
                StartTime: new Date(2022, 10, 11, 12, 0, 0),
                EndTime: new Date(2022, 10, 11, 13, 30, 0),
                PriorityId : 3,
            },
            {
                Id : 4,
                Subject : 'WAD Proj',
                StartTime: new Date(2022, 10, 11, 12, 0, 0),
                EndTime: new Date(2022, 10, 11, 13, 30, 0),
                PriorityId : 3,
                IsAllDay: true
            },
        ]
    },

    };
},

methods : {
    onTreeDragStop : function(args) {
        console.log("[start] onTreeDragStop")
        args.cancel = true;
        let schedulerComponentObject = document.getElementById('Schedule').ej2_instances[0];
        let cellData = schedulerComponentObject.getCellDetails(args.target);
        let treeviewComponentObject = document.getElementById('treeview').ej2_instances[0];
        let filteredData = treeviewComponentObject.fields.dataSource.filter(function (item) { return item.Id === parseInt(args.draggedNodeData.id); });
    let eventData = {
        Subject : filteredData[0].Name,
        startTime : cellData.startTime,
        endTime : cellData.endTime,
        IsAllDay : cellData.isAllDay
    };
      //schedulerComponentObject.addEvent(eventData);
    schedulerComponentObject.openEditor(eventData,'Add',true);
    let apptdata = this.appointmentData.dataSource;
    console.log(this.appointmentData.dataSource)
    apptdata.push(eventData)
    console.log(apptdata)
    this.getData(eventData);
    },

    getData(data) {
        console.log("[start] getData")
        console.log(data.Subject)
        console.log(data.startTime)
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

    // onSave: function () {
    //     console.log("[start] onSave")
    //     let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
    //     let eventData = {
    //         Id: 5,
    //         Subject: 'Testing-edited',
    //         StartTime: new Date(2022, 10, 11, 10, 0, 0),
    //         EndTime: new Date(2022, 10, 11, 12, 0, 0),
    //         PriorityId : 3,
    //     };
    //         scheduleObj.saveEvent(eventData);
    //     },
    // onSubmit: function () {
    //     let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
    //     let cellData = {
    //         subject: "",
    //         startTime: "",
    //         endTime: "",
    //         PriorityId: 3,
    //     };
    //     scheduleObj.openEditor(cellData,'Add');
    //     console.log(cellData)
    //     appointmentData.push(cellData);
    //     },

    // onDelete: function () {
    //     let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
    //     scheduleObj.deleteEvent(4);
    // },

    onCellClick: function(args) {
        console.log("[start] onCellClick")
        console.log(args)
        let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        scheduleObj.openEditor(args, 'Add');
        let apptdata = this.appointmentData.dataSource;
        console.log(this.appointmentData.dataSource)
        
        apptdata.push(args)
        console.log(apptdata)
    },

    onEventClick: function(args) {   
        console.log("[start] onEventClick")
        console.log(args)
        console.log(args.event)
        console.log(args.event.Id)
        console.log(args.event.Subject)
        let scheduleObj = document.getElementById('Schedule').ej2_instances[0];       
        scheduleObj.openEditor(args.event, 'Save');
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
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css'; 
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css'; 

</style>
