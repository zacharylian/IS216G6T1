import {ref, computed} from 'vue'

export const collapsed = ref(false)
export const toggleNavbar = () => (collapsed.value =!collapsed.value)

export const NAVBAR_WIDTH = 150
export const NAVBAR_WIDTH_COLLAPSED = 60
export const navbarWidth = computed(
    () => `${collapsed.value ? NAVBAR_WIDTH_COLLAPSED:NAVBAR_WIDTH}px`
)