const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;
let mainWindow;
let screenWindow;

app.on('ready',function(){
    //create new window
    mainWindow = new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('close',function(){
        app.quit();
    });

    //Build mneu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //inserting the menu
    Menu.setApplicationMenu(mainMenu);

});

// quit everything when closes

function snipText(){
    let snippedWindow;
    snippedWindow = new BrowserWindow({});
    snippedWindow.loadURL(url.format({
        pathname: path.join(__dirname,'snippedWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('close',function(){
        app.quit();
    });
    console.log("snipped");
}
//Handle takeScreenshot
function takeScreenshot(){
    screenWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Take Screenshot'
    });
    //Load html into window
    screenWindow.loadURL(url.format({
        pathname: path.join(__dirname,'snippedWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // garbage collection
    screenWindow.on('close',function(){
        screenWindow = null;
    });
    // const execSync = require('child_process').execSync;
    // const output = execSync('snippingtool', { encoding: 'utf-8' });
    // snipText(); 

}

// menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu: [
            {
                label : 'Take Screenshot',
                click(){
                    takeScreenshot();
                }
            },
            {
                label : 'Quit',
                // adding hotkeys
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }

        ]
    }

];

// optimsing for mac , basically inmac instead of file it show electron written 
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({}); // unshoft adds an empty {} to take care of the above problem
}

// Add developers tool 
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer tools',
        submenu: [
            {
                label: 'Toggle devTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();                  
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}

