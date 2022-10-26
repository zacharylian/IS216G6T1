<template>
    <navigation-bar></navigation-bar>
    <body>
        <div src="../components/layouts/calendar.html" id="app">
            <button id="authorize_button" onclick="handleAuthClick()">Authorize</button>
            <button id="signout_button" onclick="handleSignoutClick()">Sign Out</button>
        </div>

    <pre id="content" style="white-space: pre-wrap;"></pre>
    </body>

</template>

<!-- <script src="../../src/external.js"></script> -->

<script>
import navBar from '@/components/layouts/navbar.vue';


//EXPORTS
export default {
    name: 'Calendar',
    components: {
    "navigation-bar": navBar,
    }
}
</script>

<!-- <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
<script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script> -->

// how to move the top two scripts into "external.js"?
