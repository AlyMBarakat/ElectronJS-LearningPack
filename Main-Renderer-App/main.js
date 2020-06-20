console.log("main process working");
console.log("main.js");

const electron = require("electron"); //including electron
const app = electron.app;						//Including app sub-module
const BrowserWindow = electron.BrowserWindow;	//Including BrowserWindow sub-module
const path = require("path");	//Built in path module
const url = require("url");		//Built in url module


//Create UI window
let win;
function createWindow() {
	let urlObjOne = { //HTML file object
		pathname: path.join(__dirname, 'one.html'),
		protocol: 'file',
		slashes: true
	}

	let urlObjTwo = { //HTML file object
		pathname: path.join(__dirname, 'two.html'),
		protocol: 'file',
		slashes: true
	}



	winOne = new BrowserWindow({webPreferences: {nodeIntegration: true}});		//Create window
	winTwo = new BrowserWindow({webPreferences: {nodeIntegration: true}});

	winOne.loadURL(url.format(urlObjOne));//Load HTML file in window
	winTwo.loadURL(url.format(urlObjTwo));//Load HTML file in window

	//Developer tools for debugging
	winOne.webContents.openDevTools();
	winTwo.webContents.openDevTools();
	
	//Handle closing window
	winOne.on('closed', () => {win = null;});
	winTwo.on('closed', () => {win = null;});
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