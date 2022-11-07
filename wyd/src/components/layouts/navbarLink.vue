<script>
    import {computed} from 'vue'
    import {useRoute} from 'vue-router'
    import {collapsed} from './state'

    export default {
        name: "navbarLink",
        props: {
            to: {type: String, required: true},
            icon: {type: String, required: true}
        },

        setup(props) {
            const route = useRoute()
            const isActive = computed(() => route.path === props.to)
            return {isActive, collapsed}
        }
    }
</script>

<template>
    <router-link :to="to" :class="{active:isActive}">
        <i class="icon" :class="icon"/>
        <transition name="fade">
            <span v-if="!collapsed" style="padding-left:5px; font-size: 16px;" :class="{fadeOut:collapsed, fadeIn:isActive}">
                <slot />
            </span>
        </transition>
    </router-link>
</template>


<style scoped>
.fade-enter-active {
    transition: opacity 0.2s linear;
    /* transform: translateX(-100px); */
}

.fade-leave-active {
    transition: opacity 0.2s linear;
    /* transform: translateX(0); */
}

.fade-enter {
    opacity:0;
    /* transform: translateX(0px); */
}

.fade-leave-to {
    opacity: 0;
    /* transform: translateX(-100px); */
}

.link:hover {
        background-color: var(--navbar-item-hover);
        transition: 0.1s ease-in-out;
}

.link.active {
    background-color: var(--navbar-item-active);
    transition: 0.1s ease-in-out;
}


    .icon {
    /* display:flex;
    position: relative; */
    justify-content: center;
    align-items: center;
    bottom: 0;
    /* padding: 0.75em; */
    color: black;

    /* transition: 0.5s linear; */

    cursor: pointer;
    }

    .fadeOut {
        animation: fadeOut 0.1s;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        } 

        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }

    .fadeIn {
        animation: fadeIn 0.1s;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
</style>