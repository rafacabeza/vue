//ver que data es una función
//ver que el template tiene que tener un elemengo que lo englobe todo. Aquí div
Vue.component('user', {
    props: ['name', 'lastName'],
    data: function() {
        return {
            app: {
                name: 'Santiago Hernandez'
            }
        }
    },
    template: '<div><h1>{{ app.name }} </h1><h3>{{ name }} {{ lastName }}</h3></div>'
});

var app = new Vue({
    el: '#app',
    data: {
        newTask: "",
        tasks: [
            {text: "saludar", completed: true},
            {text: "trabajar", completed: false},
            {text: "despedir", completed: false}
        ]
    },
    methods: {
        addTask() {
            if (this.newTask) {
                this.tasks.push({
                    text: this.newTask,
                    completed: false
                });
                this.newTask = '';
            }
        },
        toggle(task) {
            task.completed = ! task.completed;
        },
        taskIcon(task) {
            console.log("icon");
            return ['glyphicon', task.completed ? 'glyphicon-check' : 'glyphicon-unchecked'];
        }
    },
    computed: {
        reversedTask: function() {
            return this.newTask.split('').reverse().join('');
        }
    }
});