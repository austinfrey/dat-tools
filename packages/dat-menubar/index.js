const path = require('path')
const { app, BrowserWindow } = require('electron')
const Server = require('electron-rpc/server')
const startSocket = require('@zigy/dat-socket')

const RPC = new Server()

function ready() {
	win = new BrowserWindow({ width: 800, height: 600 })
	win.loadFile('index.html')

	RPC.configure(win.webContents)
	RPC.on('open-socket', openSocket)

	function openSocket(req, next) {
		const { body } = req
		const socket = startSocket(3000)

		RPC.on('close-socket', closeSocket(socket, body))
		next()
	}

	function closeSocket (socket) {
		return function (req, next) {
			socket.stop()
			console.log('socket ended')
		  next()
		}
	}
}

app.on('ready', ready)
