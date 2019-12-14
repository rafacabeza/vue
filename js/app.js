//ver que data es una función
//ver que el template tiene que tener un elemengo que lo englobe todo. Aquí div
Vue.component('tasks', {
    template: `
    <section class="todoapp">
    <header class="header">
    <h1>Tareas</h1>
    <input v-on:keyup.enter="add" v-model="newTask" type="text" class="new-todo">
    </header>
    <section>
    <ul class="todo-list">
    <li class="todo" is="task" v-for="task in tasks" :task="task" :key="task.text"></li>
    <li class="form-inline">
    </li>
    </ul>
    </section>    
    <footer class="footer">
        <span class="todo-count">Completas {{ completed }} | </span> 
        <span class="todo-count"> Incompletas {{ uncompleted }} </span>
    </footer>
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
    template: `<li :class="classes"> 
        <div class="view">
            <input type="checkbox" class="toggle" v-model="task.completed"></span> 
            <label v-text="task.text"></label> 
        </div>
        </li>`,
    computed: {
        classes() {
            console.log("icon");
            return {completed: this.task.completed};
        }
    }
});

var app = new Vue({
    el: '#app',
});