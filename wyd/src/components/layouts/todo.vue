<template>
    <div class="container">

        <!-- Input -->
        <div class="d-flex align-items-center justify-content-center">
            <input v-model="new_task" type="text" placeholder="New Task" class="form-control rounded-5" style="width: 200px">
            <button @click="submitTask()" class="btn"><span class="fa fa-check pointer"></span></button>
        </div>

        <!-- Task Table -->

        <table class="table border-bottom-1 mt-3 center" style="width:250px">
        <!-- <thead>
            <tr>
            <th scope="col">Done</th>
            <th scope="col">Task</th>
            <th scope="col" class="text-center">Status</th>
            <th scope="col" class="text-center">Edit</th>
            <th scope="col" class="text-center">Delete</th>
            </tr>
        </thead> -->
        <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
                <td><input type="checkbox" style="float:center" @click="completeTask(index)" class="pointer"></td>
                <td>
                    <span :class="{'strikethrough':task.status=='completed'}" >
                        {{task.name}}
                    </span>
                </td>
                <td style="width: 100px">
                    <span class="pointer" @click="changeStatus(index)" 
                    :class="{'text-danger': task.status=='to-do', 'text-warning': task.status==='in progress', 'text-success':task.status==='completed'}">
                        {{task.status}}
                    </span>
                </td>
                <td>
                    <div @click="editTask(index)">
                        <span class="fa fa-pen pointer"></span>
                    </div>
                </td>
                <td>
                    <div @click="deleteTask(index)">
                        <span class="fa fa-trash pointer"></span>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </div>


</template>


<script>
    // import lightDark from './lightdark.vue';
    export default {
        name: "todo",
        props: {
            msg: String
        },

    data() {
        return {
            new_task: "",
            edit_task: null,
            available_statuses: ['to-do', 'in progress'],
            tasks: [
                {
                    name: 'Steal bananas from the store',
                    status: 'to-do'
                },
                {
                    name: 'Eat 1kg chocolate in 1 hour',
                    status: 'in-progress'
                },
            ]
        }
    },

    methods: {
        submitTask() {
            console.log("-- you are in submitTask() func --")
            if (this.new_task.length === 0) {
                return;
            }

            if (this.edit_task === null) {
                this.tasks.push(
                    {
                        name: this.new_task,
                        status: 'to-do'
                    }
                )
            } else {
                this.tasks[this.edit_task].name = this.new_task
                this.edit_task = null;
            }

            this.new_task = "";
        },

        deleteTask(index) {
            this.tasks.splice(index, 1);
        },

        editTask(index) {
            this.new_task = this.tasks[index].name;
            this.edit_task = index;
        },

        changeStatus(index) {
            let current_index = this.available_statuses.indexOf(this.tasks[index].status);
            let new_index = current_index + 1;
            if (new_index > 1) {
                new_index = 0
            }
            this.tasks[index].status = this.available_statuses[new_index];
        },

        completeTask(index) {
            this.tasks[index].status = 'completed'
            // IDK WHY THE TIMEOUT DOESNT WORK FOR MY FUNCTION BUT IF I TRY USING AN ALERT IT WORKS WTP
            // setTimeout(this.deleteTask(index), 10000)
        },
    }
    }
</script>


<style>
    @import "../../main.scss";
    .pointer {
        cursor: pointer;
    }

    .strikethrough {
        text-decoration: line-through;
    }

    .center {
        margin-left: auto;
        margin-right:auto;
    }
</style>
