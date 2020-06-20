console.log("main process working");

const electron = require("electron"); //including electron
const app = electron.app;						//Including app sub-module
const BrowserWindow = electron.BrowserWindow;	//Including BrowserWindow sub-module
const path = require("path");	//Built in path module
const url = require("url");		//Built in url module

const ipc = electron.ipcMain;
const dialog = electron.dialog;


//Create UI window
let win;
function createWindow() {
	let urlObj = { //HTML file object
		pathname: path.join(__dirname, 'View/index.html'),
		protocol: 'file',
		slashes: true
	}
	win = new BrowserWindow({webPreferences: {nodeIntegration: true}});		//Create window
	win.loadURL(url.format(urlObj));//Load HTML file in window

	//Developer tools for debugging
	win.webContents.openDevTools();
	
	//Handle closing window
	win.on('closed', () => {win = null;});
}

//Event listener - (Async)
ipc.on('async-message', function(event){ //On recieve execute
	//dialog.showErrorBox('An error message', 'Demo of an error message'); //Action
	event.sender.send('async-reply', 'Main process sent reply'); //Reply
});

//Event listener - (Sync)
ipc.on('sync-message', function(event){ //On recieve execute
	event.returnValue = 'sync-reply' //Reply
});


//Execute code
app.on('ready', createWindow);

win.loadURL('https://github.com');

//MAC(UNIX) extra features handling
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit();
	}
});
app.on('activate', () => {
	if(win === null){
		createWindow();
	}
});





