//Electron task management and more Javascript
//David Blacksher
//Web Dev II
//Kirsten Markley
//December 15 2017

//Constants and variables
const electron = require('electron');
var app = require('electron').remote
var dialog = app.dialog;
var fs = require('fs');
const ipc = electron.ipcRenderer;

//Load some jQuery Modals
$(document.readyState(function () {
    $('.modal').modal();
    loadData(__dirname + '/tasks.json');
}));

//Importing Vue
var app = new Vue({
    el: "#app",
    data: {
        //Name and task completed
        tasks: {
            items: []
        }
    },
    methods: {
        addTask() {
            var taskEntered = $("#taskEntered")[0].value;
            this.tasks.items.push({name: taskEntered, completed: false, id: this.tasks.items.length});
            updateView();
        },
        removeItem(pos) {
            this.tasks.items[pos].completed = true;
            updateView();
            },
        newTaskList(){
            this.tasks = { "items": []};
            ipc.send('save-json', {"items": [] });
            updateView();
        }
    }
});

//Buttons
document.getElementById('saveFile').addEventListener('click', _ => {
    dialog.showSaveDialog({filteres: [ { name: 'TaskList (.json)', extensions: ['json'] } ] }, function(fileName) {
        console.log(fileName);
        ipc.send('save-json', [app.tasks,fileName]);
    });
});

//Array
ipc.on('obtain-file-content', (event, args) => {
    console.log(args);
    app.tasks.items = args;
    updateView();
});

function loadData(path){
    ipc.send('open-json', path);
}

//Custom Menu
ipc.on('menu-open', (event, args) => {
    $('#openFile').modal('open');
});

ipc.on('menu-add', (event, args) => {
    $('#addTask').modal('open');
});

ipc.on('menu-clear', (event, args) => {
    app.tasks.items = [];
    updateView();
});

//Update everything
function updateView(){
    var nothing = true;
    app.tasks.items.forEach(function (item){
        if (item.completed == false) {
            nothing = false;
        }
    }, this);
    if (nothing == true) {
        $('#tasks').hide();
    }
    else {
        $('#tasks').show();
    }
}