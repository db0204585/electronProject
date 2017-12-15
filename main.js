//Electron Setup and stuff
//David Blacksher
//Web Dev II
//Kirsten Markley
//December 15 2017

const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;


//Listening for app to be ready
app.on('ready', function(){
    //New window
    mainWindow = new BrowserWindow({});
    //Loading my html file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Quit app when main window is closed regardless of other window
    mainWindow.on('closed', function(){
        console.log("Application has been terminated.")
        app.quit();
    });


    //Build my menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handling create add window
function createAddWindow(){
    //New window
    addWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'Add Task to Complete'
    });
    //Loading my html file into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Optimizing memory space
    addWindow.on('close', function(){
        addWindow = null;
    });
}

//Catch task:add
ipcMain.on('task:add', function(e, task){
    mainWindow.webContents.send('task:add', task);
    addWindow.close();
});

//Creating menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click: function(){
                    showOpen();
                }
            },
        ]
    },{
        label: 'Tasklist Options',
        submenu: [
            {
                label: 'Add Task', 
                click(){
                    createAddWindow();
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Clear Task List',
                click(){
                    mainWindow.webContents.send('task:clear')
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                click(){
                    app.quit();
                },
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            }
        ]
    }
];

//If the person is on a mac 'File' on our menu won't be shown, Instead 'Electron' will. 
//This is a fix to check if they are on a mac and fix that.
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Making sure our dev tools show up in the correct window we are operating in and
//when we are working in production mode (not necessary for this project so I never took the application
//out of production mode.)
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+T' : 'Ctrl+T',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },{
                role: 'reload'
            }
        ]
    });
}