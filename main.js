const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = electron.ipcMain;
//const remote = require("electron").remote;
//const electronFs = remote.require("fs");
//const electronDialog = remote.dialog;

app.on('ready', _=>{
    console.log("sup w0rld")
    mainWindow = new BrowserWindow({ width:300, height: 500})
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    const menu = Menu.buildFromTemplate(customMenu);
    Menu.setApplicationMenu(menu)


    mainWindow.on('closed', _=>{
        mainWindow = null
        console.log('close')
    })
})

const customMenu = [
    {
    label: "File",
    submenu : [
            {label : "Open File"
            },
            {type: "separator"
            }, 
            {label : "Quit",
            click: _=>{
                app.quit()
            },
             accelerator: "Ctrl+Q"}
                                
            ]
        },{
            label : "Dev Tools",
            click : function(item, focusedWindow){
                focusedWindow.toggleDevTools();
            },
            accelerator: "Ctrl+T"
        }
    ]

ipc.on('countdown-start', (evt,arg) =>{
    let count = 3
    let timer = setInterval(_=>{
        console.log("count" + count)
        count--
    mainWindow.webContents.send('countdown', count)
    //
    if (count == 0){
        clearInterval(timer)
    }
    }, 1000)
})