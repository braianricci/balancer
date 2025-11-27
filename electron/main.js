const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({
		width: 1000,
		height: 700,
		resizable: false,
		autoHideMenuBar: true,
		frame: false,
		titleBarStylel: "hidden",
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true
		}
	});

	//load html
	win.loadFile(path.join(__dirname, "./index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on('launch-native-rdp', (event, ipAddress) => {
	console.log('Launching RDP for:', ipAddress);
	const rdp = spawn('mstsc', [`/v:${ipAddress}`]);
	rdp.on('error', (err) => {
		console.error('Failed to start mstsc:', err);
	});
});
