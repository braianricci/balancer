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

	// Load your HTML app
	win.loadFile(path.join(__dirname, "./index.html"));

	//console
	//win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on('launch-native-rdp', (event, ipAddress) => {
	// This launches the external Windows RDP app
	// It will appear as a separate window on top of everything
	console.log('Launching RDP for:', ipAddress);
	// spawn('mstsc', [`/v:${ipAddress}`]);
	const rdp = spawn('mstsc', [`/v:${ipAddress}`]);
	rdp.on('error', (err) => {
		console.error('Failed to start mstsc:', err);
	});
});
