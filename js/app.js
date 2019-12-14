//ver que data es una función
//ver que el template tiene que tener un elemengo que lo englobe todo. Aquí div
Vue.component('tasks', {
    template: `
    <div>
    <h1>Lista de tareas</h1>
    <h3>Tareas completadas {{ completed }}</h3>
    <h3>Tareas no completadas {{ uncompleted }}</h3>
    <ul>
        <li is="task" v-for="task in tasks" :task="task" :key="task.text"></li>
        <li class="form-inline">
            <input v-on:keyup.enter="add" v-model="newTask" type="text" class="form-control">
            <button v-on:click="add()" class="btn btn-primary">+</button>
        </li>
        <li>
            {{ reversedTask }}
        </li>
    </ul>
    </div>    
    `,
    methods: {
        add() {
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
        completed: function () {
            return this.tasks.filter(function (task) {
                return task.completed;
            }).length;
        }, 
        uncompleted: function () {
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
        <span @click="toggle()" v-bind:class="icon"></span> 
        </li>`,
        methods: {
            toggle() {
                this.task.completed = ! this.task.completed;
            }
        },
        computed: {
        icon() {
            console.log("icon");
            return ['glyphicon', this.task.completed ? 'glyphicon-check' : 'glyphicon-unchecked'];
        }
    }
});

var app = new Vue({
    el: '#app',
});