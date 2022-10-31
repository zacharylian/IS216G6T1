<template>
        <navigation-bar></navigation-bar>
            <!-- <div src="../components/layouts/calendar.html" id="app">
                <button id="authorize_button" onclick="handleAuthClick()">Authorize</button>
                <button id="signout_button" onclick="handleSignoutClick()">Sign Out</button>
            </div> -->
            <div class="row pt-3 justify-content-center">
                <div class="col col-2"></div>
                <div class="col col-8">
                    <ejs-schedule currentView="Month"
                    :eventSettings="appointmentData">
                    </ejs-schedule>
                </div>
                <div class="col col-2"></div>
        </div>

</template>

<!-- <script src="../../src/external.js"></script> -->

<script>
import navBar from '@/components/layouts/navbar.vue';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';


//EXPORTS
export default {
    name: 'Calendar',
    components: {
    "navigation-bar": navBar,
    'ejs-schedule': ScheduleComponent
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
                        StartTime: new Date(2022, 9, 9, 9, 0), // idk why but month starts from 0 (jan), 1 (feb)
                        EndTime: new Date(2022, 9, 10, 10, 0)
                    },
                    {
                        Subject: 'Feed Myself',
                        StartTime: new Date(2022, 9, 11, 10, 0),
                        EndTime: new Date(2022, 9, 11, 11, 30)
                    },
                    {
                        Subject: 'Learn Thai',
                        StartTime: new Date(2022, 9, 12, 11, 30),
                        EndTime: new Date(2022, 9, 12, 12, 30)
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
