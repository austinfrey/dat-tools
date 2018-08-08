const EventEmitter = require('events')
const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const websocket = require('websocket-stream')
const dataplex = require('dataplex')
const pump = require('pump')

const bus = new EventEmitter()

module.exports = socketClient

function socketClient(url) {
	const socket = websocket(url)
	const plex = dataplex()

	pump(socket, plex, socket)

	return function (key, opts) {
		if (!opts) opts = { live: true }

		if (typeof key === 'object') {
			opts = key
			key = null
		}

		const drive = (!key) ? hyperdrive(ram) : hyperdrive(ram, key)

		drive.ready(() => {
			const key = drive.key.toString('hex')
			const stream = plex.open(`/${key}`)

			bus.emit('ready')

			pump(stream, drive.replicate(opts), stream)
		})

		return { socket, drive, bus }
	}
}
