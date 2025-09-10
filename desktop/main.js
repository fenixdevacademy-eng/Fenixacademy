const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    // Criar a janela principal
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            experimentalFeatures: true
        },
        icon: path.join(__dirname, 'assets/icon.png'),
        titleBarStyle: 'default',
        show: false
    });

    // Carregar o arquivo HTML
    mainWindow.loadFile('index.html');

    // Mostrar a janela quando estiver pronta
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // Abrir DevTools em modo de desenvolvimento
        if (process.argv.includes('--dev')) {
            mainWindow.webContents.openDevTools();
        }
    });

    // Configurar o menu da aplicação
    createMenu();

    // Eventos da janela
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createMenu() {
    const template = [
        {
            label: 'Arquivo',
            submenu: [
                {
                    label: 'Novo Arquivo',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.send('menu-new-file');
                    }
                },
                {
                    label: 'Abrir Arquivo',
                    accelerator: 'CmdOrCtrl+O',
                    click: async () => {
                        const result = await dialog.showOpenDialog(mainWindow, {
                            properties: ['openFile'],
                            filters: [
                                { name: 'HTML Files', extensions: ['html', 'htm'] },
                                { name: 'CSS Files', extensions: ['css'] },
                                { name: 'JavaScript Files', extensions: ['js'] },
                                { name: 'All Files', extensions: ['*'] }
                            ]
                        });

                        if (!result.canceled && result.filePaths.length > 0) {
                            const filePath = result.filePaths[0];
                            const content = fs.readFileSync(filePath, 'utf8');
                            mainWindow.webContents.send('menu-open-file', {
                                path: filePath,
                                content: content
                            });
                        }
                    }
                },
                {
                    label: 'Salvar',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        mainWindow.webContents.send('menu-save-file');
                    }
                },
                {
                    label: 'Salvar Como',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: async () => {
                        const result = await dialog.showSaveDialog(mainWindow, {
                            filters: [
                                { name: 'HTML Files', extensions: ['html'] },
                                { name: 'CSS Files', extensions: ['css'] },
                                { name: 'JavaScript Files', extensions: ['js'] }
                            ]
                        });

                        if (!result.canceled) {
                            mainWindow.webContents.send('menu-save-as', result.filePath);
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Sair',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Editar',
            submenu: [
                { label: 'Desfazer', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                { label: 'Refazer', accelerator: 'CmdOrCtrl+Y', role: 'redo' },
                { type: 'separator' },
                { label: 'Cortar', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                { label: 'Copiar', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                { label: 'Colar', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                { type: 'separator' },
                { label: 'Selecionar Tudo', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
            ]
        },
        {
            label: 'Visualizar',
            submenu: [
                { label: 'Recarregar', accelerator: 'CmdOrCtrl+R', role: 'reload' },
                { label: 'Forçar Recarregar', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
                { label: 'Ferramentas do Desenvolvedor', accelerator: 'F12', role: 'toggleDevTools' },
                { type: 'separator' },
                { label: 'Zoom In', accelerator: 'CmdOrCtrl+Plus', role: 'zoomin' },
                { label: 'Zoom Out', accelerator: 'CmdOrCtrl+-', role: 'zoomout' },
                { label: 'Zoom Reset', accelerator: 'CmdOrCtrl+0', role: 'resetzoom' },
                { type: 'separator' },
                { label: 'Tela Cheia', accelerator: 'F11', role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Executar',
            submenu: [
                {
                    label: 'Executar Código',
                    accelerator: 'F5',
                    click: () => {
                        mainWindow.webContents.send('menu-run-code');
                    }
                },
                {
                    label: 'Parar Execução',
                    accelerator: 'Shift+F5',
                    click: () => {
                        mainWindow.webContents.send('menu-stop-code');
                    }
                }
            ]
        },
        {
            label: 'Ajuda',
            submenu: [
                {
                    label: 'Sobre Fenix IDE 2.0',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Sobre Fenix IDE 2.0',
                            message: 'Fenix IDE 2.0 - Desktop Version',
                            detail: 'Um IDE moderno e poderoso para desenvolvimento web.\n\nVersão: 2.0.0\nDesenvolvido por: Fenix Academy'
                        });
                    }
                },
                {
                    label: 'Atalhos de Teclado',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Atalhos de Teclado',
                            message: 'Atalhos Principais:',
                            detail: 'Ctrl+N - Novo Arquivo\nCtrl+O - Abrir Arquivo\nCtrl+S - Salvar\nCtrl+Shift+S - Salvar Como\nF5 - Executar Código\nF12 - DevTools\nCtrl+Space - IntelliSense'
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Eventos do IPC
ipcMain.handle('save-file', async (event, { filePath, content }) => {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return { success: true, content };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Eventos da aplicação
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Prevenir múltiplas instâncias
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}
