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
            <span v-if="!collapsed" style="padding-left:5px; font-size: 16px;">
                <slot/>
            </span>
        </transition>
    </router-link>
</template>


<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,.fade-leave-to {
    opacity:0;
}

    .link:hover {
        background-color: var(--navbar-item-hover);
    }

    .link.active {
        background-color: var(--navbar-item-active);
    }

    .icon {
        width: 35px;
        padding-right: 3px;
        padding-left: 2px;
        /* display:flex;
        justify-content: space-between;
        align-items: center; */
    }
</style>