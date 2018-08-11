const EventEmitter = require('events')
const websocket = require('websocket-stream')
const dataplex = require('dataplex')
const {pipe, through} = require('mississippi')
const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const swarm = require('hyperdiscovery')
const stoppable = require('stoppable')

const DAT_KEY_REGEX = /^([0-9a-f]{64})/i

module.exports = class DatSocket extends EventEmitter {
	constructor () {
		super()
		this.connections = []
	}

	createServer (server, cb) {
		stoppable(server)
		websocket.createServer({ server }, this.handler)
		cb()
	}

	handler (stream) {
		const plex = dataplex()

		this._addRoute(plex)
		pipe(stream, plex, stream, end)
	}

	_addRoute (plex) {
		plex.add('/:key', opts => {
			const {key} = opts

			if (!DAT_KEY_REGEX.test(key)) { // How do I send back to client
				return console.error(new Error('Key is invalid'))
			}

			const archive = hyperdrive(ram, key)
			const sw = swarm(archive)

			sw.on('connection', (peer, type) => console.log('peer'))

			return archive.replicate({live: true})
		})
	}
}

function logger(chunk, enc, next) {
	console.log('DATA', chunk)
	this.push(chunk)
	next()
}

function end(err) {
	if (err) {
		return console.error('[ ERROR ]', err.message)
	}
	console.log('Socket Closed')
}

function listening(port) {
	return function () {
		console.log(`SERVER started on port: ${port}`)
	}
}
