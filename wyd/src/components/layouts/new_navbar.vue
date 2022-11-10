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
</template>

<style>
    @import "@/navbar.css";
</style>

<script>
    import lightDark from './lightdark.vue';
    import { getAuth, signOut } from "firebase/auth"
                
                
    export default {
        name: "navbar",
        components: {

        },

        methods: {
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