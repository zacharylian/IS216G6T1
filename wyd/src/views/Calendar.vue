<template>
    <nav class="navbar_home">
    <ul class="navbar-nav">
        <li class="nav-li">
            <router-link to="/" class="nav-link2">
            <i class="fas fa-house fa-2x" />
            <span class="link-text" >
                    Home
            </span>
            </router-link>
        </li>

        <li class="nav-li">
            <router-link to="/Calendar" class="nav-link2">
            <i class="fas fa-calendar-days fa-2x" />
            <span class="link-text" >
                    Calendar
            </span>
            </router-link>
        </li>

        <li class="nav-li">
            <router-link to="/SpendingDashboard" class="nav-link2">
            <i class="fas fa-sack-dollar fa-2x" />
            <span class="link-text" >
                    Spendings
            </span>
            </router-link>
        </li>

        <li class="nav-li">
            <router-link to="/FocusTimer" class="nav-link2">
            <i class="fas fa-stopwatch fa-2x" />
            <span class="link-text" >
                    Timer
            </span>
            </router-link>
        </li>

        <li class="nav-li">
            <a href="#" class="nav-link2">
            <span @click="googleSignOut">
                <i class="fas fa-right-from-bracket fa-2x" @click="googleSignOut"></i>
            </span>
            </a>
        </li>

    </ul>
    </nav>
    <div style="margin-left:6rem">
        <div class="scheduler-title">Personalised Calendar
            <div class="d-flex row pt-3">
                <div class="col col-2"></div>
                <div class="col col-8">
                    <ejs-schedule height="120%" width="100%" currentView="Month"
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
                        <e-header-rows>
                            <e-header-row option="Year"></e-header-row>
                            <e-header-row option="Month"></e-header-row>
                            <e-header-row option="Week"></e-header-row>
                            <e-header-row option="Date"></e-header-row>
                            <e-header-row option="Hour"></e-header-row>
                        </e-header-rows>
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
            <ejs-treegrid :dataSource="appointmentData.dataSource" 
                :treeColumnIndex="1" style="z-index:-1">
                <e-columns>
                    <e-column field="Id" headerText="S/N" width="5" textAlign="center"></e-column>
                    <e-column field="Subject" headerText="Task" width="30" textAlign="center"></e-column>
                    <e-column field="StartTime" headerText="Start" width="20" format="yMd" textAlign="center"></e-column>
                    <e-column field="EndTime" headerText="End" width="20" format="yMd" textAlign="center"></e-column>
                    <e-column field="PriorityId" headerText="Priority" width="10" textAlign="center"></e-column>
                    <e-column field="modId" headerText="Mod" width="5" textAlign="center"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
    </div>
</template>

<script>
import { getAuth, signOut } from '@firebase/auth';
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
    // data: sampleData,

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
                modId: 1,
            },
            {
                Id : 2,
                Subject : 'WAD Help',
                StartTime: new Date(2022, 10, 8, 10, 0, 0),
                EndTime: new Date(2022, 10, 8, 11, 30, 0),
                PriorityId : 2,
                modId: 2,
            },
            {
                Id : 3,
                Subject : 'Mtg',
                StartTime: new Date(2022, 10, 11, 12, 0, 0),
                EndTime: new Date(2022, 10, 11, 13, 30, 0),
                PriorityId : 3,
                modId: 3,
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
    chedulerComponentObject.openEditor(eventData,'Add',true);
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


</style>
