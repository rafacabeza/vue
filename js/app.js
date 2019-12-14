//ver que data es una función
//ver que el template tiene que tener un elemengo que lo englobe todo. Aquí div
Vue.component('tasks', {
    template: `
    <div>
    <h1>Lista de tareas</h1>
    <h3>Tareas completadas {{ completedTasks }}</h3>
    <h3>Tareas no completadas {{ uncompletedTasks }}</h3>
    <ul>
        <li is="task" v-for="task in tasks" :task="task" :key="task.text"></li>
        <li class="form-inline">
            <input v-on:keyup.enter="addTask" v-model="newTask" type="text" class="form-control">
            <button v-on:click="addTask()" class="btn btn-primary">+</button>
        </li>
        <li>
            {{ reversedTask }}
        </li>
    </ul>
    </div>    
    `,
    methods: {
        addTask() {
            if (this.newTask) {
                this.tasks.push({
                    text: this.newTask,
                    completed: false
                });
                this.newTask = '';
            }
        }
    },
    data: function () {
        return {
            newTask: "",
            tasks: [
                {text: "saludar", completed: true},
                {text: "trabajar", completed: false},
                {text: "despedir", completed: false}
            ]
        }
    },
    computed: {
        reversedTask: function() {
            return this.newTask.split('').reverse().join('');
        }, 
        completedTasks: function () {
            return this.tasks.filter(function (task) {
                return task.completed;
            }).length;
        }, 
        uncompletedTasks: function () {
            return this.tasks.filter(function (task) {
                return !task.completed;
            }).length;
        }
    }
});


Vue.component('task', {
    props: ['task'],
    template: `<li > 
        <span v-text="task.text"></span> 
        <span @click="toggle()" v-bind:class="taskIcon"></span> 
        </li>`,
        methods: {
            toggle() {
                this.task.completed = ! this.task.completed;
            }
        },
        computed: {
        taskIcon() {
            console.log("icon");
            return ['glyphicon', this.task.completed ? 'glyphicon-check' : 'glyphicon-unchecked'];
        }
    }
});

var app = new Vue({
    el: '#app',
});