<template>
    <navbar style="z-index:5"></navbar>
    <body>
        <div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        </div>
    </body>
    <div style="margin:0rem 7rem">
        <div class="d-flex row pt-3">
            <!-- <div class="col-lg-3 bgbox col-md-12" style="border-radius:20px;padding:15px">
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
            </div> -->
            <div class="col-12" style="margin-left:40px;margin-right:-40px;padding-bottom:80px;padding-top:20px">
                <div class=" col-11 d-flex justify-content-center align-items-center mx-auto" >
                    <ejs-schedule height="560px" width="100%" currentView="Month"
                    id='Schedule' 
                    :popupOpen='onPopupOpen'
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
                        </e-resources>
                        <template v-slot:schedulerEditorTemplate="{}">
                            <table>
                                <tbody>
                                    <tr>
                                        <td colspan=4 class="e-textlabel">
                                            Summary
                                        </td>
                                        <td colspan=20>
                                            <input class="e-field e-input" type="text" id="Subject" name="Subject" ref="Subject" />
                                            <!-- e-field and name need to be same -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan=4 class="e-textlabel">
                                            Priority Level
                                        </td>
                                        <td colspan=20>
                                            <ejs-dropdownlist class="e-field" placeholder="Choose Priority"
                                            :dataSource="prioHardCodedDataSource" id="PriorityId" name="PriorityId" ref="PriorityId">

                                            </ejs-dropdownlist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan=4 class="e-textlabel">
                                            From
                                        </td>
                                        <td colspan=20>
                                            <ejs-datetimepicker format="dd/MM/yyyy HH:mm" class="e-field" id="StartTime" name="StartTime" ref="Start_Time">

                                            </ejs-datetimepicker>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan=4 class="e-textlabel">
                                            To
                                        </td>
                                        <td colspan=20>
                                            <ejs-datetimepicker format="dd/MM/yyyy HH:mm"  class="e-field" id="EndTime" name="EndTime" ref="End_Time">

                                            </ejs-datetimepicker>
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td colspan=4 class="e-textlabel">
                                            Description
                                        </td>
                                        <td colspan=20>
                                            <input class="e-field e-input" type="text" id="Description" name="Description" ref="Description"/>
                                        </td>
                                    </tr> -->
                                    <tr>
                                        <td>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan=20 style="text-align:right">
                                            <ejs-button v-on:click.native='Add(curr_id)'>Add/Edit</ejs-button>
                                            <ejs-button v-on:click.native='Delete(curr_id)'>Delete</ejs-button>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </template>
                    </ejs-schedule>
                </div>
                <div class=" col-11 d-flex justify-content-center align-items-center mx-auto bgbox" style="padding:25px 0px">
                    Legend:&nbsp;&nbsp;
                    <div style="background-color: RGBA(184,29,19,0.81);color:white;">&nbsp;High Priority&nbsp;</div>&nbsp;&nbsp;
                    <div style="background-color: RGBA(239,183,0,0.81);color:white;">&nbsp;Mid Priority&nbsp;</div>&nbsp;&nbsp;
                    <div style="background-color: RGBA(0,132,80,0.81);color:white;">&nbsp;Low Priority&nbsp;</div>
                </div>
            </div>
        </div>
        <!-- <div>Events: {{this.appointmentData.dataSource}}</div> -->

        
    </div>
</template>

<script>
import navbar from '@/components/layouts/new_navbar.vue';
import { getAuth, signOut } from '@firebase/auth';
import { appointmentData } from '@/data.js';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, ResourcesDirective, ResourceDirective, HeaderRowDirective, HeaderRowsDirective,} from '@syncfusion/ej2-vue-schedule';
import {DataManager, WebApiAdaptor} from "@syncfusion/ej2-data";
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-treegrid';
import { directive } from '@babel/types';
import { getDatePredicate } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';
import { L10n } from '@syncfusion/ej2-base';
import {addDocs, collection, getDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import { db } from '../main';

L10n.load({
    'en-US': {
        'schedule' : {
            'saveButton': '',
            'cancelButton': '',
            'deleteButton': '',
            'newEvent': 'Add Event'
        }
    }
})


//EXPORTS
export default {

    created(){
    console.log("=====getting UID=====")
        this.uid = getAuth().currentUser.uid
        console.log(this.uid)

        console.log("=====extracting data from db=====")
        this.checkdb()

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
        curr_id : 0,
        uid: "",
        prioHardCodedDataSource: ['High-Priority', 'Mid-Priority', 'Low-Priority'],
        prioDatasource: [
            {prioName: 'High-Priority', prioId: 1, color: '#B81D13'},
            {prioName: 'Mid-Priority', prioId: 2, color: '#EFB700'},
            {prioName: 'Low-Priority', prioId: 3, color: '#008450'}
        ],

        treeviewFields: { 
            dataSource: 
            [
            //     {Id: 1, Name: 'WADII'},
            //     {Id: 2, Name: 'CT'},
            //     {Id: 3, Name: 'BPAS'},
            //     {Id: 4, Name: 'IDP'},
            //     {Id: 5, Name: 'Feed Dog'}
            ],
            id:'Id', text:'Name'
        },
        schedulerSelectedDate : new Date(),
        showQuickInfo: false,
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
    onPopupOpen(args) {
        if (args.type === "QuickInfo") {
                args.cancel = true; 
            }
    },

    async checkdb(){
        const docRef = doc(db, "calendar", this.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()){
            // Retrieving appointData
            let apptinfo = docSnap.data().appointmentData
            for (let info of apptinfo){
                console.log("for loooooooop")
                info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
                info.EndTime = new Date(info.EndTime.seconds*1000 + info.EndTime.nanoseconds/1000000)
                let scheduleObj =     document.getElementById('Schedule').ej2_instances[0];
                scheduleObj.addEvent(info);
            }
            console.log("=====input apptinfo=====")
            this.appointmentData.dataSource = apptinfo

            // Retrieving treeview
            // let treeinfo = docSnap.data().treeviewData
            // console.log("input treeinfo")
            // this.treeviewFields.dataSource[0] = docSnap.data().treeviewData
            // this.treeviewFields.id = docSnap.data().id
            // this.treeviewFields.text = docSnap.data().text
            // console.log(treeinfo)
            // for (let info of treeinfo){
            //     var treeGridObj = document.getElementById("treeview").ej2_instances[0]
            //     treeGridObj.addNodes([info])
            // }

            // Retrieving Curr_Id
            this.curr_id = docSnap.data().currId

        } else{
            setDoc(docRef, {appointmentData: [], treeviewData: [], currId: 0, id: 'Id', text: 'Name'})
        }
    },
    async updatedbevent(){
        const docRef = doc(db, "calendar", this.uid);
        await updateDoc(docRef, { currId: this.curr_id, appointmentData: this.appointmentData.dataSource })
    },

    async updatedbtree(){
        const docRef = doc(db, "calendar", this.uid);
        await updateDoc(docRef, { treeviewData: this.treeviewFields.dataSource, id: this.treeviewFields.id, text: this.treeviewFields.text })
    },


    Delete(curr_id) {
        console.log("[start] Delete()")
        if (curr_id != 0) {
            let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
            let apptdata = this.appointmentData.dataSource;
            console.log(curr_id)
            console.log(apptdata)
            for (let eventdata in apptdata) {
                // console.log(eventdata)
                if (apptdata[eventdata].Id == curr_id) {
                    console.log(eventdata)
                    console.log(apptdata[eventdata].Id)
                    console.log(apptdata[eventdata])
                    scheduleObj.deleteEvent(apptdata[eventdata])
                    apptdata.splice(eventdata,1)
                }
            }
            this.curr_id = 0
            scheduleObj.closeEditor();
            this.updatedbevent()
        }
    },  

    Add(curr_id) {
        console.log("[start] Add()")
        // console.log(this.appointmentData.dataSource)
        console.log(curr_id)
        let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        // let subject = document.getElementById("Subject")
        let priority = document.getElementById("PriorityId")
        let input_StartTime = document.getElementById("StartTime").value
        let input_EndTime = document.getElementById("EndTime").value
        let subject = this.$refs.Subject
        // let input_StartTime = this.$refs.Start_Timee
        // let input_EndTime = this.$refs.End_Time
        console.log(subject.value)
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

    if (curr_id == 0) {
            // get id
            let apptdata = this.appointmentData.dataSource;
            let max = 0
            for (let info of apptdata) {
                if (info.Id > max) {
                    max = info.Id
                }
            }
            let id = max + 1
            console.log(id)
            // let priority = this.$refs.PriorityId
            console.log(priority)
            console.log(priority.value)
            console.log(subject.value)
            console.log(input_StartTime)
            console.log(input_EndTime)
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
                this.updatedbevent()
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
            this.updatedbevent()
    } else {
        console.log(curr_id)
        let apptdata = this.appointmentData.dataSource;
        let priority = document.getElementById("PriorityId")
        for (let eventdata of apptdata) {
                if (eventdata.Id == curr_id) {
                    console.log(eventdata.Id)
                    console.log(eventdata)
                    console.log(subject.value)
                    console.log(priority.value)
                    // eventdata.Subject = subject.value;
                    // eventdata.StartTime = start;
                    // eventdata.EndTime = end;
                    // console.log(eventdata.Subject)
                    // console.log(eventdata.StartTime)
                    // console.log(eventdata.EndTime)
                    if (priority.value == 'High-Priority') {
                        let priorityId = 1
                        let data = {
                                Id : curr_id,
                                Subject: subject.value,
                                StartTime: start,
                                EndTime: end,
                                PriorityId: priorityId,
                        };
                        scheduleObj.deleteEvent(eventdata)
                        for (let curr_info in apptdata) {
                            if (apptdata[curr_info].Id == curr_id) {
                                apptdata.splice(curr_info,1)
                            }
                        }
                        apptdata.push(data)
                        scheduleObj.addEvent(data)
                        this.updatedbevent()
                    } else if (priority.value == 'Mid-Priority') {
                        let priorityId = 2
                        scheduleObj.deleteEvent(eventdata)
                        apptdata.splice(eventdata.Id-1,1)
                        let data = {
                                Id : curr_id,
                                Subject: subject.value,
                                StartTime: start,
                                EndTime: end,
                                PriorityId: priorityId,
                        };
                        scheduleObj.deleteEvent(eventdata)
                        for (let curr_info in apptdata) {
                            if (apptdata[curr_info].Id == curr_id) {
                                apptdata.splice(curr_info,1)
                            }
                        }
                        apptdata.push(data)
                        scheduleObj.addEvent(data)
                        this.updatedbevent()
                    } else if (priority.value == 'Low-Priority') {
                        let priorityId = 3
                        let data = {
                                Id : curr_id,
                                Subject: subject.value,
                                StartTime: start,
                                EndTime: end,
                                PriorityId: priorityId,
                        };
                        scheduleObj.deleteEvent(eventdata)
                        for (let curr_info in apptdata) {
                            if (apptdata[curr_info].Id == curr_id) {
                                apptdata.splice(curr_info,1)
                            }
                        }
                        apptdata.push(data)
                        scheduleObj.addEvent(data)
                        this.updatedbevent()
                    }
                }
            }
            scheduleObj.closeEditor();
            this.curr_id = 0
            this.updatedbevent() //used to update new data into db, keep at the end of function
        }
    },
    
    Add_Treeview() {
        console.log("[start] Add_Treeview")
        let new_tree =  document.getElementById("Treeview").value
        console.log(new_tree)
        let data = this.treeviewFields.dataSource[0]
        console.log(data)
        let id = data.length + 1
        console.log(id)
        data.push(
            {
                Id: id,
                Name: new_tree
            }
        )
        this.updatedbtree() //used to update new data into db, keep at the end of function
        var treeGridObj = document.getElementById("treeview").ej2_instances[0]
        treeGridObj.addNodes([{
                Id: id,
                Name: new_tree
            }])
        document.getElementById("Treeview").value = ""
    },

    onTreeDragStop : function(args) {
        console.log("[start] onTreeDragStop")
        args.cancel = true;
        let schedulerComponentObject = document.getElementById('Schedule').ej2_instances[0];
        // let schedulerComponentObject = this.$refs.schedulerObject.ej2Instances
        let cellData = schedulerComponentObject.getCellDetails(args.target);
        // let treeviewComponentObject = document.getElementById('treeview').ej2_instances[0];
        // let treeviewComponentObject = this.$refs.treeviewObject.ej2Instances
        // let filteredData = treeviewComponentObject.fields.dataSource.filter(function (item) { return item.Id === parseInt(args.draggedNodeData.id); });
        let filteredData = this.treeviewFields.dataSource.filter(function (item) { return item.Id === parseInt(args.draggedNodeData.id); });
        // console.log(treeviewComponentObject.dataSource)
        console.log(filteredData)
        let eventData = {
            Subject : filteredData[0].Name,
            StartTime : cellData.startTime,
            EndTime : cellData.endTime,
        };
    
        // schedulerComponentObject.addEvent(eventData);
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
        scheduleObj.closeQuickInfoPopup();
        scheduleObj.openEditor();
    },

    onEventClick: function(args) {   
        console.log("[start] onEventClick")
        // console.log(args)
        // console.log(args.event)
        // console.log(args.event.Id)
        this.curr_id = args.event.Id
        console.log(this.curr_id)
        console.log(args.event.Subject)
        let scheduleObj = document.getElementById('Schedule').ej2_instances[0];  
        scheduleObj.closeQuickInfoPopup();     
        scheduleObj.openEditor(args.event);
        let subject = document.getElementById("Subject")
        console.log(subject.value)
        this.updatedbevent()
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

<style type="text/css">

/* .e-control, 
.e-wrapper { 
  font-family: 'Times New Roman', Times, serif !important; 
} 
  */


.e-work-cells, .e-header-cells, .e-work-hours, .e-child-node, .e-parent-node,  .e-all-day-cells  {

    background-color: #e6E8ff !important;
    /* filter: grayscale(30%) */

}

.e-timeline-view .e-work-hours {
    background-color: #e6E8ff !important;
    /* filter: grayscale(30%) */
}

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
