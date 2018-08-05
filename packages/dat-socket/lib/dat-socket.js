const http = require('http')
const websocket = require('websocket-stream')
const dataplex = require('dataplex')
const { pipe, through } = require('mississippi')
const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const swarm = require('hyperdiscovery')
const stoppable = require('stoppable')

module.exports = startServer

const server = stoppable(http.createServer())
const wss = websocket.createServer({ server }, handler)

function startServer (port, cb) {
	server.listen(port, cb || listening(port))

	return server
}

function handler (stream, request) {
	const plex = dataplex()

	plex.add('/:key', function (opts) {
		const { key } = opts
		const archive = hyperdrive(ram, key)
		const sw = swarm(archive)
		console.log(key)

		sw.on('connection', (peer, type) => console.log(type))

		return archive.replicate({ live: true })
	})

	pipe(
		stream,
		through(logger),
		plex,
		stream,
		end
	)
}

function logger (chunk, enc, next) {
	console.log('DATA', chunk)
	this.push(chunk)
	next()
}

function end (err) {
	if (err) return console.error('[ ERROR ]', err.message)
  console.log('Socket Closed')
}

function listening (port) {
	return function (){
		console.log(`SERVER started on port: ${port}`)
	}
}
