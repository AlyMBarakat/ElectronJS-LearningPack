console.log("main process working");

const electron = require("electron"); //including electron
const app = electron.app;						//Including app sub-module
const BrowserWindow = electron.BrowserWindow;	//Including BrowserWindow sub-module
const path = require("path");	//Built in path module
const url = require("url");		//Built in url module


//Create UI window
let win;
function createWindow() {
	let urlObj = { //HTML file object
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}
	win = new BrowserWindow();		//Create window
	win.loadURL(url.format(urlObj));//Load HTML file in window

	//Developer tools for debugging
	win.webContents.openDevTools();
	
	//Handle closing window
	win.on('closed', () => {win = null;});
}


//Execute code
app.on('ready', createWindow);


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





