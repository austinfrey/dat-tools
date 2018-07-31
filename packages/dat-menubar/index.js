const path = require('path')
const menubar = require('menubar')
const Server = require('electron-rpc/server')
const startSocket = require('@zigy/dat-socket')

const app = new Server()
const mb = menubar({ icon: path.join(__dirname, 'dat.png') })

function ready() {
	const socket = startSocket(3000)

	app.on('open-socket', openSocket)
	app.on('close-socket', closeSocket)

	function openSocket(req, next) {
		const { body } = req
		const socket = startSocket(3000)

		app.on('close-socket', closeSocket(socket))
		next()
	}

	function closeSocket (socket) {
		return function (req, next) {
			socket.stop()
		  next()
		}
	}
}

mb.on('show', () => app.configure(mb.window.webContents))
mb.on('ready', ready)
