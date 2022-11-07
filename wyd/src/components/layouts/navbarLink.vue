<script>
    import {computed} from 'vue'
    import {useRoute} from 'vue-router'
    import {open, collapsed} from './state'

    export default {
        name: "navbarLink",
        props: {
            to: {type: String, required: true},
            icon: {type: String, required: true}
        },

        setup(props) {
            const route = useRoute()
            const isActive = computed(() => route.path === props.to)
            return {isActive, open}
        }
    }
</script>

<template>
    <router-link :to="to" class="link" :class="{active:isActive}">
        <i class="icon" :class="icon"/>
        <transition name="slide-fade">
            <span v-if="!open" style="padding-left:5px; font-size: 16px;" >
                <slot />
            </span>
        </transition>
    </router-link>
</template>


<style scoped>
/* .fade-enter-active {
    transition: opacity 0.2s linear;
}

.fade-leave-active {
    transition: opacity 0.2s linear;
}

.fade-enter {
    opacity:0;
}

.fade-leave-to {
    opacity: 0;
} */

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}

.link{
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    font-weight: 700;
    user-select: none;
    margin: 1.5em 0;
    border-radius: 0.2em;
    height: 2em;

    color: black;
    text-decoration: none;

    top: 0;
    height: 100%;
    }

.link:hover {
        background-color: var(--navbar-item-hover);
        /* transition: 0.1s ease-in-out; */
}

.link.active {
    background-color: var(--navbar-item-active);
    /* transition: 0.1s ease-in-out; */
}


.link .icon {
    /* display:flex;
    position: relative; */
    justify-content: center;
    align-items: center;
    bottom: 0;
    /* padding: 0.75em; */
    color: black;
    flex-shrink: 0;
    width: 35px;

    /* transition: 0.5s linear; */

    cursor: pointer;
    }

    /* .fadeOut {
        animation: fadeOut 0.1s;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;

        } 

        to {
            opacity: 0;

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
    } */
</style>