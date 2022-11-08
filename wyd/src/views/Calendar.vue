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
        <!-- <div class="container-fluid">
            <div src="../components/layouts/calendar.html" id="app"> -->
                <!-- <button id="authorize_button" onclick="handleAuthClick()">Authorize</button> -->
            <!-- </div> -->
            <div class="row pt-3 justify-content-center">
                <div class="col col-2"></div>
                <div class="col col-8">
                    <ejs-schedule currentView="Month"
                    :eventSettings="appointmentData">
                    </ejs-schedule>
                </div>
                <div class="col col-2"></div>
        </div>
    </div>
</template>

<!-- <script src="../../src/external.js"></script> -->

<script>
import {open, toggleNavbar, navbarWidth} from '@/components/layouts/state';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';
import navBar from '@/components/layouts/navbar.vue';


//EXPORTS
export default {
    name: 'Calendar',
    components: {
    'ejs-schedule': ScheduleComponent,
    'navigation-bar': navBar,
    },
    setup() {
    return {open, toggleNavbar, navbarWidth}
    },
    provide : {
        schedule: [Day, Week, WorkWeek, Month, Agenda]
    },
    data(){
        return{
            appointmentData : {
                dataSource : [ // can put in data dynamically, just need to know the format.
                    {
                        Subject: 'Project Meeting',
                        StartTime: new Date(2022, 10, 7, 9, 0), // idk why but month starts from 0 (jan), 1 (feb)
                        EndTime: new Date(2022, 10, 8, 10, 0)
                    },
                    {
                        Subject: 'Feed Myself',
                        StartTime: new Date(2022, 10, 17, 10, 0),
                        EndTime: new Date(2022, 10, 17, 11, 30)
                    },
                    {
                        Subject: 'Learn Thai',
                        StartTime: new Date(2022, 10, 17, 11, 30),
                        EndTime: new Date(2022, 10, 17, 12, 30)
                    },
                    {
                        Subject: 'SOS for WADII Project',
                        StartTime: new Date(2022, 10, 8, 11, 30),
                        EndTime: new Date(2022, 10, 13, 23, 30)
                    }
                ]
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


<!-- <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
<script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script> -->

// how to move the top two scripts into "external.js"?
