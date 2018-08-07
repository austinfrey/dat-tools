const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const websocket = require('websocket-stream')
const dataplex = require('dataplex')
const {pipe} = require('mississippi')

module.exports = passInUrl

function passInUrl(url) {
	return function (state, emitter) {
		state.mnt = state.mnt || {}

		emitter.on(state.events.DOMCONTENTLOADED, () => {
			const stream = websocket(url)
			const plex = dataplex()

			pipe(stream, plex, stream)

			emitter.on('drive-init', driveInit)

			function driveInit(info) {
				const {name, key} = info
				const drive = key ?
					hyperdrive(ram, key) :
					hyperdrive(ram)

				state.mnt[name] = drive

				drive.on('ready', () => {
					const key = drive.key.toString('hex')
					const plexStream = plex.open(`/${key}`)
					console.log(key)

					pipe(plexStream, drive.replicate({live: true}), plexStream)
				})
			}
		})
	}
}
