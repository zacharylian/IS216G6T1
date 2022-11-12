<template>
    <navbar></navbar>
    <body>
        <div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        </div>
    </body>
    <div style="margin-left:6rem">
        <div class="d-flex row pt-3">
            <div class="col-2">
                <div class="treeview-title">Common Task List
                    <div>
                        <input class="e-field e-input" type="text" id="Treeview" name="Treeview" />
                        <ejs-button v-on:click.native='Add_Treeview()'>Add</ejs-button>
                    </div>
                    <div class="treeview-component mx-auto">
                        <ejs-treeview id="treeview"
                        :fields="treeviewFields" 
                        :allowDragAndDrop='true'
                        :nodeDragStop="onTreeDragStop"
                        ref="treeviewObject">
                        </ejs-treeview>
                    </div>
                    <div>
                        Trees: {{treeviewFields.dataSource}}
                    </div>
                </div>
            </div>
            <div class="col-10">
                <div>
                    <ejs-button cssClass='e-info' v-on:click.native='onRefreshLayout'>Refresh Layout</ejs-button>
                </div>
                <div class=" col-10 d-flex mx-auto" >
                    <ejs-schedule height="150%" width="100%" currentView="Month"
                    id='Schedule'
                    :eventSettings="appointmentData"
                    :selectedDate="schedulerSelectedDate"
                    :dragStart="onDragStart"
                    :resizeStart="onResizeStart"
                    allowMultiDrag='true'
                    ref="schedulerObject"
                    :group="groupResource"
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
                                            <input class="e-field e-input" type="text" id="Subject" name="Subject" />
                                            <!-- e-field and name need to be same -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="e-textlabel">
                                            Priority Level
                                        </td>
                                        <td colspan="4">
                                            <ejs-dropdownlist class="e-field" placeholder="Choose Priority"
                                            :dataSource="prioHardCodedDataSource" id="PriorityId" name="PriorityId">

                                            </ejs-dropdownlist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="e-textlabel">
                                            From
                                        </td>
                                        <td colspan="4">
                                            <ejs-datetimepicker format="dd/MM/yyyy HH:mm" class="e-field" id="StartTime" name="StartTime" >

                                            </ejs-datetimepicker>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="e-textlabel">
                                            To
                                        </td>
                                        <td colspan="4">
                                            <ejs-datetimepicker format="dd/MM/yyyy HH:mm"  class="e-field" id="EndTime" name="EndTime">

                                            </ejs-datetimepicker>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="e-textlabel">
                                            Description
                                        </td>
                                        <td colspan="4">
                                            <input class="e-field e-input" type="text" id="Description" name="Description" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <ejs-button v-on:click.native='Add()'>Add</ejs-button>
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
import {addDocs, collection, getDoc, doc, firestoreAction, setDoc, updateDoc} from 'firebase/firestore';
import { db } from '../main';

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
    created(){
    console.log("=====getting UID=====")
        this.uid = getAuth().currentUser.uid
        console.log(this.uid)

        console.log("=====extracting data from db=====")
        this.checkdb()
        // for (data in appointmentData.dataSource) {
        //     console.log("====here data====")
        //     console.log(data)
        //     let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        //     scheduleObj.addEvent(this.appointmentData.dataSource[data]);
        // }
    },
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

    uid: "",
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
    // groupResource : {
    //     byDate: true,
    //     byGroupID: false,
    //     resources : ["Priority"]
    // },
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
            // {
            //     Id : 1,
            //     Subject : 'Learn Thai',
            //     StartTime: new Date(2022, 10, 5, 8, 0, 0),
            //     EndTime: new Date(2022, 10, 6, 9, 0, 0),
            //     PriorityId : 1,
            // },
            // {
            //     Id : 2,
            //     Subject : 'WAD Help',
            //     StartTime: new Date(2022, 10, 8, 8, 0, 0),
            //     EndTime: new Date(2022, 10, 8, 9, 0, 0),
            //     PriorityId : 2,
            // },
            // {
            //     Id : 3,
            //     Subject : 'Mtg',
            //     StartTime: new Date(2022, 10, 11, 12, 0, 0),
            //     EndTime: new Date(2022, 10, 11, 13, 30, 0),
            //     PriorityId : 3,
            // },
            // {
            //     Id : 4,
            //     Subject : 'WAD Proj',
            //     StartTime: new Date(2022, 10, 11, 12, 0, 0),
            //     EndTime: new Date(2022, 10, 11, 13, 30, 0),
            //     PriorityId : 3,
            //     IsAllDay: true
            // },
        ]
    },

    };
},

methods : {
    
    async checkdb(){
        const docRef2 = doc(db, "calendar", this.uid);
            const docSnap2 = await getDoc(docRef2);
            if (docSnap2.exists()) {
            console.log(this.appointmentData)
            console.log("Document data:", docSnap2.data());
            let apptinfo = docSnap2.data().appointmentData
            for (let info of apptinfo){
                console.log("for loooooooop")
                info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
                info.EndTime = new Date(info.EndTime.seconds*1000 + info.EndTime.nanoseconds/1000000)
                let scheduleObj =     document.getElementById('Schedule').ej2_instances[0];
                scheduleObj.addEvent(info);
            }
            this.appointmentData.dataSource = apptinfo
            console.log(this.appointmentData)
            this.treeviewFields.dataSource = docSnap2.data().treeviewData
            
            
            

            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log("=====creating calendar document=====")
            setDoc(docRef2, { appointmentData: [], treeviewData: []});
            }

    },
    async updatedb(){
        const docRef = doc(db, "calendar", this.uid);
        await updateDoc(docRef, { appointmentData: this.appointmentData.dataSource, treeviewData: this.treeviewFields.dataSource })
    },
    onRefreshLayout: function () {
        console.log("[start] onRefreshLayout")
        let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        scheduleObj.refreshLayout();
    },

    Add() {
        console.log("[start] Add()")
        // console.log(this.appointmentData.dataSource)
        let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        let subject = document.getElementById("Subject")
        let priority = document.getElementById("PriorityId")
        let input_StartTime = document.getElementById("StartTime").value
        let input_EndTime = document.getElementById("EndTime").value

        // get id
        let apptdata = this.appointmentData.dataSource;
        let id = apptdata.length + 1

        // format start time and date
        let str_length = input_StartTime.length
        let start_date = input_StartTime.slice(0,10)
        let date_ele = start_date.split("/")
        let year = date_ele[2]
        let month = date_ele[1] -1
        let day = date_ele[0]

        let start_time = input_StartTime.slice(11,str_length)
        let hour_min = start_time.split(":")
        let hour = hour_min[0]
        let min = hour_min[1]

        let start = new Date(year, month, day, hour, min, 0)

        // format end time and date
        let str_length2 = input_EndTime.length
        let end_date = input_EndTime.slice(0,10)
        let date_ele2 = end_date.split("/")
        let year2 = date_ele2[2]
        let month2 = date_ele2[1] -1
        let day2 = date_ele2[0]

        let end_time = input_EndTime.slice(11,str_length2)
        let hour_min2 = end_time.split(":")
        let hour2 = hour_min2[0]
        let min2 = hour_min2[1]

        let end = new Date(year2, month2, day2, hour2, min2, 0)


        if (priority.value == 'High-Priority') {
            let priorityId = 1
            let data = {
                Id : id,
                Subject: subject.value,
                StartTime: start,
                EndTime: end,
                PriorityId: priorityId,
            };
            console.log(data)
            apptdata.push(data);
            scheduleObj.addEvent(data)
        } else if (priority.value == 'Mid-Priority') {
            let priorityId = 2
            let data = {
                Id : id,
                Subject: subject.value,
                StartTime: start,
                EndTime: end,
                PriorityId: priorityId,
            };
            console.log(data)
            apptdata.push(data);
            scheduleObj.addEvent(data)
        } else if (priority.value == 'Low-Priority') {
            let priorityId = 3
            let data = {
                Id : id,
                Subject: subject.value,
                StartTime: start,
                EndTime: end,
                PriorityId: priorityId,
            };
            console.log(data)
            apptdata.push(data)
            scheduleObj.addEvent(data)
        }
        scheduleObj.closeEditor();
        this.updatedb() //used to update new data into db, keep at the end of function
    },

    Add_Treeview() {
        console.log("[start] Add_Treeview")
        let new_tree =  document.getElementById("Treeview").value
        console.log(new_tree)
        let data = this.treeviewFields.dataSource
        data.push(
            {Name: new_tree}
        )
        document.getElementById("Treeview").value = ""
        this.updatedb() //used to update new data into db, keep at the end of function
    },

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
    // let apptdata = this.appointmentData.dataSource;
    // console.log(this.appointmentData.dataSource)
    // apptdata.push(eventData)
    // console.log(apptdata)
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


    onCellClick: function(args) {
        console.log("[start] onCellClick")
        console.log(args)
        let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        scheduleObj.openEditor();
    },

    onEventClick: function(args) {   
        console.log("[start] onEventClick")
        console.log(args)
        console.log(args.event)
        console.log(args.event.Id)
        console.log(args.event.Subject)
        let scheduleObj = document.getElementById('Schedule').ej2_instances[0];       
        scheduleObj.openEditor(args.event);
        let subject = document.getElementById("Subject")
        console.log(subject.value)
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
