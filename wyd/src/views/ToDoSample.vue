<template>
    <section>
    <todo></todo>
    <div><h1>This is tobe sample</h1></div>
    </section>
</template>



<script>
// // @ is an alias to /src
import todo from '@/components/layouts/todo.vue';

export default {
    name: 'ToDoList',
    components: {
    "todo": todo,
}
}
</script>

<style scoped>
</style>