const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('rdp', {
  connect: (ip) => ipcRenderer.send('launch-native-rdp', ip)
});
