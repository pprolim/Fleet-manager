const path = require('path');
const { app, BrowserWindow } = require('electron');

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 900,
        height: 800,
        center: true,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    });

    mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    app.quit();
});