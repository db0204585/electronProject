//Electron Final Project
//David Blacksher
//Kirsten Markley
//December 15 2017
const electron = require('electron');
const {dialog} = require('electron').remote;
const fs = require('fs');

document.getElementById('savebtn').addEventListener('click', () => {
    let content = document.getElementById.textNode.('taskText').value;

    dialog.showSaveDialog((filename) => {
        if(filename === undefinted){
            console.log("The task list was not saved.")
            return;
        }

        fs.writeFile(filename, content, (err) => {
            if(err){
                console.log("An error occurred with the save of the file." + err.message);
                return;
            }
            alert("File sucessfully saved.");
        })
    });
}, false);