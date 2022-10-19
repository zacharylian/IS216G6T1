<template>
    <div class="container">
        <h2>To Do List</h2>

        <!-- Input -->
        <div class="d-flex">
            <input type="text" placeholder="New Task" class="form-control">
            <button class="btn btn-warning rounded-0">SUBMIT</button>
        </div>

        <!-- Task Table -->
        <table class="table table-bordered mt-5">
        <thead>
            <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-center">EditButton</th>
            <th scope="col" class="text-center">Delete Button</th>
            <th scope="col" class="text-center">Done Button</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Steal Banana from store</td>
            <td>To-do</td>
            <td>
                <div>
                    <span class="fa fa-pen"></span>
                </div>
            </td>
            <td>
                <div>
                    <span class="fa fa-trash"></span>
                </div>
            </td>
            <td>
                <div>
                    <span class="fa fa-check"></span>
                </div>
            </td>
            </tr>
            <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            </tr>
            <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
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
    }
    }
</script>


<style>
    @import "../../main.scss";
</style>
