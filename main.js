const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const ipc = electron.ipcMain


app.on('ready', _=>{
    console.log("sup w0rld")
    mainWindow = new BrowserWindow({ width:300, height: 500})
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    const menu = Menu.buildFromTemplate(myTemplate)
    Menu.setApplicationMenu(menu)


    mainWindow.on('closed', _=>{
        mainWindow = null
        console.log('close')
    })
})

const myTemplate = [
    {label: "About",
     click: _=>{
         console.log("You clicked me!")
     }               
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