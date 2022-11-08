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
        <i class="icon" :class="icon" />
        <transition name="slide-fade">
            <span v-if="!open" style="padding-left:5px; font-size: 16px;" >
                <slot />
            </span>
        </transition>
    </router-link>
</template>


<style scoped>
.slide-fade-enter-active {
    transition: all 1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
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
    filter: grayscale(100%) opacity(0.6);

    /* top: 0; */
    /* height: 100%; */
    }

.link:hover {
    /* background-color: var(--navbar-item-hover); */
    filter: grayscale(0%) opacity(1);
}

.link.active {
    filter: grayscale(0%) opacity(1); 
}


.link .icon {
    justify-content: center;
    align-items: center;
    bottom: 0;
    color: black;
    width: 35px;
    cursor: pointer;
    filter: grayscale(100%) opacity(0.6);
    }

.link .icon:hover {
    filter: grayscale(0%) opacity(1)
}


@media only screen and (min-width:600px) {

}

@media only screen and (max-width:600px) {

}
</style>