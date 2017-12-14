//Electron Setup and stuff
//David Blacksher
//Web Dev II
//Kirsten Markley
//December 15 2017

//Constants
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = electron.ipcMain;
const {dialog} = require('electron');

//Variables
//var json = require('json-file');
var fs = require('fs');



app.on('ready', function(){
    //console.log("electron running!")
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: false

 });

 mainWindow.loadURL(`file://${__dirname}/index.html`)

 const menu = Menu.buildFromTemplate(template)
 Menu.setApplicationMenu(menu)

    mainWindow.on('closed', function(){
        console.log('Application has been terminated.')
        mainWindow = null
    })
})

var showOpen = function(){
    dialog.showOpenDialog({properties: ['openFile'],})
}

const template = [
    {
        label: "File",
        submenu: [
            {
                label: 'Open',
                click: function(){
                   showOpen()
                }
            },
        ]
       },{
            label:"Options",
            submenu:[
                {
                    label:"Add Item"
                },
                {
                    type: "separator"
                },
                {
                    label:"Clear Items"
                },
                {
                    type: "separator"
                },
                {
                    label: "Quit",
                    click: function(){
                        app.quit()
                    },
                    accelerator: 'Ctrl+Q'
                }
                
            ]      
    },{
        label:"Dev Tools",
        click: function(item, focusedWindow){
            focusedWindow.toggleDevTools()
        },
        accelerator: 'ctrl+I'
    }
]

//Add event listeners
ipc.on('open-json', (event, path)=>{
    var file = json.read(path);
    var obj = file.get('items');
    mainWindow.webContents.send('obtain-file-content', obj);
});
ipc.on('save-json', (event, path)=>{
    console.log(args[0]);
    var file = `${args[1]}`;
    console.log(file);
    fs.writeFileSync(file, JSON.stringify(args[0]));
});