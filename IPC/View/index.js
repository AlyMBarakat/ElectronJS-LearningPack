const electron = require("electron");
const ipc = electron.ipcRenderer;

const sendAsyncBtn = document.getElementById('sendAsync');
const sendSyncBtn= document.getElementById('sendSync');


//On button click: Async
sendAsyncBtn.addEventListener('click', function() { //Asynchronous executes the code without waiting for reply
	console.log("async message 1");
	ipc.send('async-message');//Request on open-error-dialog channel
	console.log("async message 2");
});
//Event listener
ipc.on('async-reply', function(event,arg) {
	document.body.innerHTML = render;
	console.log(arg);
})

//On button click: Sync
sendSyncBtn.addEventListener('click', function() { //synchronous executes the code and returns reply
	console.log("sync message 1");
	const reply = ipc.sendSync('sync-message'); //send event
	console.log(reply);
	console.log("sync message 2");
});

//Create window using remote module
const BrowserWindow = electron.remote.BrowserWindow; //Remote object from main process
let remoteWin = new BrowserWindow();  //Remote objecc of Browser Window

remoteWin.loadURL("https://youtube.com"); //send IPC message