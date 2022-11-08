

<template>
    <div class="container">

        <!-- Input -->
        <div class="d-flex align-items-center justify-content-center">
            <button @click="undo()" class="btn fix" v-if="completed_tasks.length>0"><span class="fa fa-rotate-left"></span></button>
            <input @keypress.enter="submitTask()" v-model="new_task" type="text" placeholder="New Task" class="form-control rounded-5" style="width: 225px">
            <button @click="submitTask()" class="btn"><span class="fa fa-check pointer"></span></button>
        </div>

        <!-- Task Table -->

        <table class="table border-bottom-1 mt-3 center" style="width:100%; table-layout: fixed">
        <thead>
            <tr>
            <th class="text-center" style="width: 4%;"></th>
            <th class="text-center" style="width: 51%;">Task</th>
            <th class="text-center" style="width: 20%;">Status</th>
            <th class="text-center" style="width: 10%;">Edit</th>
            <th class="text-center" style="width: 15%;">Delete</th>
            </tr>
        </thead>

        <tbody>
			<tr style="background-color:#B19CD9; filter:opacity(50%)">
				<th colspan=5><span style="color:white; filter:opacity(100%)">In Progress</span></th>
			</tr>
			<template v-for="(task, index) in tasks">  
			<tr v-if="task.status==='started' || task.status==='done :)'" :key="index" :class="{fadeOut: task.completed== true}">
                <td style="width:5px" class="align-middle">
                    <input type="checkbox" style="float:center" @click="completeTask(index)" class="pointer" :checked="task.completed== true" >
                </td>
                <td class="align-middle" >
                    <span :class="{'strikethrough':task.completed==true}" >
                        {{task.name}}
                    </span>
                </td>

                <td class="align-middle" >
                    <span class="pointer" @click="changeStatus(index)" 
                    :class="{'text-danger': task.status=='to - do!', 'text-warning': task.status==='started', 'text-success':task.status==='done :)'}">
                        {{task.status}}
                    </span>
                </td>
                <td class="align-middle">
                    <div @click="editTask(index)" class="pen">
                        <span class="fa fa-pen pointer"></span>
                    </div>
                </td>
                <td class="align-middle" >
                    <div @click="deleteTask(index)">
                        <!-- <span class="fa fa-trash pointer"></span> -->
                        <span class="trash pointer">
                            <span></span>
    	                    <i></i>
                        </span>
                    </div>
                </td>
            </tr>
		</template>
		</tbody>

		<tbody>
			<tr style="background-color:#B19CD9; filter:opacity(50%)">
				<th colspan=5> <span style="color:white; filter:opacity(100%)">To-Do</span></th>
			</tr>
			<template v-for="(task, index) in tasks"> 
            <tr v-if="task.status==='to - do!' || task.status==='done :)'" :key="index" :class="{fadeOut: task.completed== true}">
                <td style="width:5px" class="align-middle">
                    <input type="checkbox" style="float:center" @click="completeTask(index)" class="pointer" :checked="task.completed== true" >
				</td>
                <td class="align-middle">
                    <span :class="{'strikethrough':task.completed==true}" >
                        {{task.name}}
                    </span>
                </td>

                <td class="align-middle"  >
                    <span class="pointer" @click="changeStatus(index)" 
                    :class="{'text-danger': task.status=='to - do!', 'text-warning': task.status==='started', 'text-success':task.status==='done :)'}">
                        {{task.status}}
                    </span>
                </td>
                <td class="align-middle">
                    <div @click="editTask(index)" class="pen">
                        <span class="fa fa-pen pointer"></span>
                    </div>
                </td>
                <td class="align-middle" >
                    <div @click="deleteTask(index)">
                        <!-- <span class="fa fa-trash pointer"></span> -->
                        <span class="trash pointer">
                            <span></span>
    	                    <i></i>
                        </span>
                    </div>
                </td>
            </tr>
		</template>
        </tbody>
        </table>
    </div>


</template>


<script>
    import { getAuth } from 'firebase/auth'
    import {addDocs, collection, getDoc, doc, firestoreAction, setDoc, updateDoc} from 'firebase/firestore'
    import { ref, onMounted } from 'vue'
    import { db } from '../../main'
    
    
    export default {
        created(){
            
        console.log("=====getting UID=====")
        this.uid = getAuth().currentUser.uid
        console.log(this.uid)

        console.log("=====extracting data from db=====")
        this.checkdb()
        },
        name: "todo",
        props: {
            msg: String
        },

    data() {
        return {
            uid: "",
            new_task: "",
            edit_task: null,
            available_statuses: ['to - do!', 'started'],
            completed: false,
            tasks: [],

			completed_tasks: []

			
        }
    },

    methods: {
        async checkdb(){
            const docRef = doc(db, "todolist", this.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            this.tasks = docSnap.data().todo
            this.completed_tasks = docSnap.data().completed

            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setDoc(docRef, {todo:[], completed:[]});
            }
        },

        async updatedb(){
            const docRef = doc(db, "todolist", this.uid);
            await updateDoc(docRef, { todo: this.tasks, completed: this.completed_tasks})

        },
        submitTask() {
            console.log("-- you are in submitTask() func --")
            if (this.new_task.length === 0) {
                return;
            }

            if (this.edit_task === null) {
                this.tasks.push(
                    {
                        name: this.new_task,
                        status: 'to - do!',
                        completed: false
                    }
                )
                this.updatedb()

            } else {
                this.tasks[this.edit_task].name = this.new_task
                this.edit_task = null;
                this.updatedb()
            }

            this.new_task = "";
        },

        deleteTask(index) {
            this.tasks.splice(index, 1);
            this.updatedb()
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
            // this.tasks[index].status = 'done :)'
            this.tasks[index].completed = true
			this.completed_tasks.push(
				{
                        name: this.tasks[index].name,
                        status: this.tasks[index].status,
                        completed: true
                }
			)
            setTimeout(() => {this.tasks.splice(index, 1)}, 2000);
			console.log(this.completed_tasks)
            this.updatedb()
        },

		undo() {
			// if (this.completed_tasks.length == 0 ){
			// 	return ""
			// } else {
			let index = this.completed_tasks.length - 1
			let task = this.completed_tasks[index]
			this.tasks.push(task)
			this.completed_tasks.splice(this.completed_tasks.length - 1, 1)
		
		}


    }
    }
</script>


<style>
    @import "../../main.scss";

    .fix {
        position: fixed;
        margin-left: -325px;
    }

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

    .fadeOut {
        animation: fadeOut 2s;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        } 

        to {
            opacity: 0;
        }
    }

	.pen:hover {
		transform: rotate(45deg);
		transition: 0.2s linear;
	}


    /* animated trashbin css */
    .trash {
	background:black;
	width: 10px;
	height: 15px;
	display: inline-block;
	margin:0 auto;
    margin-bottom: -3px;
	
	position: relative;
	-webkit-border-bottom-right-radius: 0.5px;
	-webkit-border-bottom-left-radius: 0.5px;
	-moz-border-radius-bottomright: 0.5px;
	-moz-border-radius-bottomleft: 0.5px;
	border-bottom-right-radius: 0.5px;
	border-bottom-left-radius: 0.5px;
}
.trash:after {
	position: absolute;
	left: -16px;
	right: 0;
	bottom: -8px;
	width: 50px;
}
.trash span {
	position: absolute;
	height: 2px;
	background: black;
	top: -3px;
	left: -1.5px;
	right: -1.5px;
	
	border-top-left-radius: 1px;
	border-top-right-radius: 1px;
	transform: rotate(0deg);
	transition: transform 250ms;
	transform-origin: 19% 100%;
}
.trash span:after {
	content: '';
	position: absolute;
	width: 5px;
	height: 1px;
	background: black;
	top: -3px;
	
	border-top-left-radius: 1px;
	border-top-right-radius: 1px;
	transform: rotate(0deg);
	transition: transform 250ms;
	transform-origin: 19% 100%;
	left: 4px;
}

.trash i {
	position:relative;
	width: 0px;
	height:8px;
	background:#fff;
	display:block;
	margin:4px auto;
    margin-left: 6px;
	border-radius: 0.5px;
}
.trash i:after {
	content: '';
	width: 0.5px;
	height: 8px;
	background: #fff;
	position: absolute;
	left: -3px;
	border-radius: 0.5px;
}
.trash i:before {
	content: '';
	width: 0.5px;
	height: 8px;
	background: #fff;
	position: absolute;
	right: -1px;
	border-radius: 0.5px;
}

.trash:hover span {
	transform: rotate(-45deg);
	transition: transform 250ms;
}


</style>

