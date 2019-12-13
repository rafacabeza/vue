Vue.component('user', {
    props: ['name', 'lastName'],
    template: '<h1>{{ name }} {{ lastName }}</h1>'
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