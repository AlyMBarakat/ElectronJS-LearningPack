console.log("Main process running");

const electron = require("electron"); //including electron
const app = electron.app;						//Including app sub-module
const BrowserWindow = electron.BrowserWindow;	//Including BrowserWindow sub-module
const path = require("path");	//Built in path module
const url = require("url");		//Built in url module


//Create UI window
let win, dimWindow, colorWindow, framelessWindow;
let parentWindow, childWindow;

//URLs
let urlObj = { //HTML file object
	pathname: path.join(__dirname, 'View/index.html'),
	protocol: 'file',
	slashes: true
}

function createWindow() {

	//Create window
	//win = new BrowserWindow({webPreferences: {nodeIntegration: true}});
	// //Create window and set dimensions and fixed dimesions
	//dimWindow = new BrowserWindow({webPreferences: {nodeIntegration: true}, width: 600, height: 300, maxWidth: 600, maxHeight: 600});
	// //Create window and set color
	// colorWindow = new BrowserWindow({webPreferences: {nodeIntegration: true}, backgroundColor: '#228b22' });
	// //Create frameless Window
	// framelessWindow = new BrowserWindow({webPreferences: {nodeIntegration: true}, backgroundColor: '#A9A9A9', frame: false, width: 400, height: 200});

	parentWindow = new BrowserWindow({webPreferences: {nodeIntegration: true}, title: 'Parent'});
	childWindow = new BrowserWindow({show: false, parent: parentWindow, modal: true, webPreferences: {nodeIntegration: true}, title: 'Child'}); 
	childWindow.loadURL('https://www.discord.com/');
	childWindow.once('ready-to-show', () => {
		childWindow.show();
	})

	// //Load HTML file in window
	// win.loadURL(url.format(urlObj));
	// dimWindow.loadURL(url.format(urlObj));
	// colorWindow.loadURL(url.format(urlObj));
	// parentWindow.loadURL(url.format(urlObj));
	// childWindow.loadURL(url.format(urlObj));

	//Show DeveloperTools for debugging
	//childWindow.webContents.openDevTools();	
	
	// //Close window
	// win.on('closed', () => {win = null;});
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