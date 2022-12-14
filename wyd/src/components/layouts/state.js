import {ref, computed} from 'vue' 

export const collapsed = ref(false)
export const open = ref(true)
export const toggleNavbar = () => (open.value =!open.value)

export const NAVBAR_WIDTH = 150
export const NAVBAR_WIDTH_COLLAPSED = 60
export const navbarWidth = computed(
    () => `${open.value ? NAVBAR_WIDTH_COLLAPSED:NAVBAR_WIDTH}px`
)