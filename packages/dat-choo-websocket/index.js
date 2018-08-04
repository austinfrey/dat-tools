const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const websocket = require('websocket-stream')
const { pipe } = require('mississippi')

module.exports = passInUrl

function passInUrl (url) {
	return function datChooWebsocket (state, emitter) {
		emitter.on(state.events.DOMCONTENTLOADED, function () {
			if (state.route === '/') return initdrive()
			if (state.params.key) return connectdrive(state.params.key)
		})

		function initdrive () {
			const drive = hyperdrive(ram)
			state.drive = drive

			drive.on('ready', function () {
				const key = drive.key.toString('hex')
				const stream = websocket(`${url}/${key}`)
				console.log(key)

				pipe(stream, drive.replicate({ live: true }), stream)
			})
		}

		function connectdrive (key) {
			const drive = hyperdrive(ram, key)
			state.drive = drive

			drive.on('ready', function () {
				const key = drive.key.toString('hex')
				const stream = websocket(`${url}/${key}`)
				console.log(key)

				pipe(stream, drive.replicate({ live: true }), stream)
			})
		}
	}
}
