const Client = require('electron-rpc/client')

const client = new Client()

module.exports = socketStore

function socketStore(state, emitter) {
	state.socketOn = false
	console.log('socket on', state.socketOn)

	emitter.on('DOMContentLoaded', () => {
		emitter.on('socket-on', toggleSocket)

		function toggleSocket(socketOpts) {
			console.log('TOGGLE ON?', socketOpts.on)
			if (socketOpts.on) {
				return openSocket(socketOpts)
			}
			closeSocket()
		}

		function closeSocket() {
			return client.request('close-socket', () => {
				console.log('SOCKET OFF')
				state.socketOn = false
			})
		}

		function openSocket(socketOpts) {
			return client.request('open-socket', socketOpts.opts, () => {
				console.log('SOCKET ON')
				state.socketOn = true
			})
		}
	})
}
