const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const {dialog} = require('electron')



app.on('ready', function(){
    //console.log("electron running!")
    mainWindow = new BrowserWindow({
 })

 mainWindow.loadURL(`file://${__dirname}/index.html`)

 const menu = Menu.buildFromTemplate(template)
 Menu.setApplicationMenu(menu)

    mainWindow.on('closed', function(){
        console.log('closed')
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
            label:"Edit",
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
