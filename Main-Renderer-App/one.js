console.log("from one.js");

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');


const newWindowBtn = document.getElementById('newWindowBtn');
let urlObjThree = { //HTML file object
	pathname: path.join(__dirname, 'three.html'),
	protocol: 'file',
	slashes: true
}


newWindowBtn.addEventListener('click', function(event){
	let winThree = new BrowserWindow({webPreferences: {nodeIntegration: true}});
	winThree.loadURL(url.format(urlObjThree));//Load HTML file in window
	winThree.webContents.openDevTools();
});