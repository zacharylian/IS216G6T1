

<template>
    <div class="container">

        <!-- Input -->
        <div class="d-flex align-items-center justify-content-center">
            <input @keypress.enter="submitTask()" v-model="new_task" type="text" placeholder="New Task" class="form-control rounded-5" style="width: 225px">
            <button @click="submitTask()" class="btn"><span class="fa fa-check pointer"></span></button>
        </div>

        <!-- Task Table -->

        <table class="table border-bottom-1 mt-3 center"  >
        <thead>
            <tr>
            <th scope="col" style="width:1%"></th>
            <th scope="col" style="width:62%">Task</th>
            <th scope="col" style="width: 35%" class="text-center">Status</th>
            <th scope="col" style="width: 1%" class="text-center">Edit</th>
            <th scope="col" style="width: 1%" class="text-center">Delete</th>
            </tr>
        </thead>

        <tbody>
			<tr style="background-color:grey; filter:opacity(50%)">
				<th colspan=5><span style="color:white; filter:opacity(100%)">In Progress</span></th>
			</tr>
			<template v-for="(task, index) in tasks">  
			<tr v-if="task.status==='started' || task.status==='done :)'" :key="index" :class="{fadeOut: task.completed== true}">
                <td style="width:5px" class="align-middle">
                    <input type="checkbox" style="float:center" @click="completeTask(index)" class="pointer" :checked="task.completed== true" >
                </td>
                <td class="align-middle" style="width:50px">
                    <span :class="{'strikethrough':task.status=='done'}" >
                        {{task.name}}
                    </span>
                </td>

                <td class="align-middle" style="width: 10%" >
                    <span class="pointer" @click="changeStatus(index)" 
                    :class="{'text-danger': task.status=='to - do!', 'text-warning': task.status==='started', 'text-success':task.status==='done :)'}">
                        {{task.status}}
                    </span>
                </td>
                <td class="align-middle" style="width: 1%">
                    <div @click="editTask(index)">
                        <span class="fa fa-pen pointer"></span>
                    </div>
                </td>
                <td class="align-middle" style="width: 1%">
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
			<tr style="background-color:grey; filter:opacity(50%)">
				<th colspan=5> <span style="color:white; filter:opacity(100%)">To-Do</span></th>
			</tr>
			<template v-for="(task, index) in tasks"> 
            <tr v-if="task.status==='to - do!' || task.status==='done :)'" :key="index" :class="{fadeOut: task.completed== true}">
                <td style="width:5px" class="align-middle">
                    <!-- <input type="checkbox" style="float:center" @click="completeTask(index)" class="pointer" :checked="task.completed== true" > -->
					<input type="checkbox" style="float:center" @click="completeTask(index)" class="pointer" >
				</td>
                <td class="align-middle" style="width:50px">
                    <span :class="{'strikethrough':task.status=='done'}" >
                        {{task.name}}
                    </span>
                </td>

                <td class="align-middle" style="width: 10%" >
                    <span class="pointer" @click="changeStatus(index)" 
                    :class="{'text-danger': task.status=='to - do!', 'text-warning': task.status==='started', 'text-success':task.status==='done :)'}">
                        {{task.status}}
                    </span>
                </td>
                <td class="align-middle" style="width: 1%">
                    <div @click="editTask(index)">
                        <span class="fa fa-pen pointer"></span>
                    </div>
                </td>
                <td class="align-middle" style="width: 1%">
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
            available_statuses: ['to - do!', 'started'],
            completed: false,
            todo_tasks: [
                {
                    name: 'Steal bananas from the store',
                    status: 'to - do!',
                    completed: false,
                },
                {
                    name: 'Eat 1kg chocolate in 1 hour',
                    status: 'to - do!',
                    completed: false,
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
                        status: 'to - do!' 
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
            this.tasks[index].status = 'done :)'
            this.tasks[index].completed = true
            setTimeout(() => {this.tasks.splice(index, 1)}, 2000);
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

    /* animated pencil css */
    /* .pencil {
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translate(-50%, 0%);
	animation: yeah 5s infinite ease-in-out;
}

@keyframes yeah {
	0% {
		transform: translate(-50%, 10px) rotate(0deg);
	}
	20% {
		transform: translate(-50%, 70px) rotate(17deg);
	}
	40% {
		transform: translate(-50%, 70px) rotate(-17deg);
	}
}

.line {
	z-index: -1;
	position: absolute;
	top: 428px;
	left: 50%;
	transform: translate(-50%, 0);
	width: 100px;
	height: 20px;
	border-radius: 50%;
	box-shadow: 0 5px 0 0 #555;
	animation: line 5s infinite ease-in-out;
}

@keyframes line {
	0% {
		transform: translate(Calc(-50% - 50px), 0);
		opacity: 1;
		width: 0px;
		height: 0px;
	}
	20% {
		transform: translate(Calc(-50% - 50px), 0);
		opacity: 1;
		width: 0px;
		height: 10px;
	}
	40%,
	55% {
		transform: translate(-50%, 0);
		opacity: 1;
		width: 100px;
		height: 10px;
	}
	60% {
		transform: translate(Calc(-50% + 50px), 0);
		opacity: 0;
		width: 0px;
		height: 10px;
	}
	100% {
		transform: translate(Calc(-50% + 50px), 0);
		opacity: 0;
		width: 0px;
		height: 10px;
	}
}

.rubber {
	z-index: 1;
	position: relative;
	left: 5px;
	width: 90px;
	height: 40px;
	background: grey;
	border-radius: 25px 25px 0 0;
}


.ferrule {
	z-index: 2;
	position: relative;
	width: 100px;
	height: 40px;
	background: grey;
	border-radius: 4px;
	box-shadow: 0px 2px 0 0px rgba(0, 0, 0, 0.4);
}

.stripe:nth-child(1) {
	top: 10px;
}

.stripe:nth-child(2) {
	top: 15px;
}

.stick {
	z-index: 1;
	position: relative;
	left: 5px;
	width: 90px;
	height: 200px;
	background: grey;
	border-radius: 15px;
}

.side {
	position: absolute;
	width: 30px;
	height: 200px;
	border-radius: 0 0 25px 25px;
}

.side:nth-child(1) {
	left: 0;
	top: 0;
	background: grey;
}

.side:nth-child(2) {
	left: 30px;
	top: 0;
	background: grey;
}

.side:nth-child(3) {
	left: 60px;
	top: 0;
	background: grey;
}


.bottom {
	z-index: 2;
	position: relative;
	left: 5px;
	top: -11px;
	width: 0;
	height: 10px;
	border-left: 45px solid transparent;
	border-right: 45px solid transparent;
	border-top: 90px solid grey;
}

.graphite {
	position: relative;
	left: 45px;
	top: -33px;
	width: 10px;
	height: 15px;
	background: grey;
	border-radius: 2px 2px 50% 50%;
} */

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

