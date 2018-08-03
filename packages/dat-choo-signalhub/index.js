const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const signalhub = require('signalhub')
const { pipe, through } = require('mississippi')
const swarm = require('webrtc-swarm')

function passInUrl (urlsArray) {
	return function driveStore (state, emitter) {
		emitter.on(state.events.DOMCONTENTLOADED, function () {
			if (state.route === '/') return initdrive()
			if (state.params.key) return connectdrive(state.params.key)
		})

		function initdrive () {
			const drive = hyperdrive(ram)
			state.drive = drive

			drive.on('ready', function () {
				console.log(drive.key.toString('hex'))

				const sw = swarm(signalhub(drive.discoveryKey.toString('hex'), urlsArray))

				sw.on('peer', function (stream) {
					console.log('peer')
					pipe(stream, drive.replicate(), stream)
				})
			})
		}

		function connectdrive (key) {
			const drive = hyperdrive(ram, key)
			state.drive = drive

			drive.on('ready', function () {
				console.log(drive.key.toString('hex'))

				const sw = swarm(signalhub(drive.discoveryKey.toString('hex'), urlsArray))

				sw.on('peer', function (stream) {
					console.log('peer')
					pipe(stream, drive.replicate(), stream)
				})
			})
		}
	}
}

module.exports = passInUrl
