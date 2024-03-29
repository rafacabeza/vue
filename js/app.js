//ver que data es una función
//ver que el template tiene que tener un elemengo que lo englobe todo. Aquí div
Vue.component('tasks', {
    template: `
        <section class="todoapp">
            <header class="header">
            <h1>Tareas</h1>
            <input v-on:keyup.enter="add" v-model="newTask" type="text" class="new-todo" placeholder="¿Qué hay que hacer?">
            </header>
            <section>
            <ul class="todo-list">
                <li class="todo" is="task" v-for="task in tasks" :task="task" :key="task.index"></li>
            </ul>
            </section>    
            <footer class="footer" v-show="tasks.length">
                <span class="todo-count">Completas {{ completed }} | </span> 
                <span class="todo-count"> Incompletas {{ uncompleted }} </span>
            </footer>
        </section>`,
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
                {index: 0, text: "saludar", completed: true},
                {index: 1, text: "trabajar", completed: false},
                {index: 2, text: "despedir", completed: false}
            ]
        }
    },
    computed: {
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
                <label v-text="task.text" @dblclick="edit()"></label> 
                <button class="destroy" @click="remove()"></button>
            </div>
            <input class="edit" 
                v-model="task.text" 
                @keyup.enter="dontEdit()" 
                @keyup.esc="cancelEdit()" 
                @blur="dontEdit()" />
        </li>`,
    data: function() {
        return {
            editing: false,
            oldText: ''
        }
    },
    methods: {
        edit: function () {
            this.oldText = this.task.text;
            this.editing = true;
            // console.log(this.$el);
            // console.log(this.$el.children[1]);
            // this.$el.children[1].focus(); // no va, hace falta nextTick 
            // nextTick lanza lo que sea tras actualizar el DOM
            this.$nextTick(() => this.$el.children[1].focus());
        },
        dontEdit: function () {
            if (! this.task.text) {
                this.remove();
            }
            this.editing = false;
        },
        cancelEdit: function () {
            this.editing = false;
            this.task.text = this.oldText;
        },
        remove: function() {
            let tasks = this.$parent.tasks;
            tasks.splice(tasks.indexOf(this.task), 1);
        }
    },
    computed: {
        classes() {
            console.log("icon");
            return {completed: this.task.completed, editing: this.editing};
        }
    }
});

var app = new Vue({
    el: '#app',
});