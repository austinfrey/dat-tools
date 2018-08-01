const http = require('http')
const websocket = require('websocket-stream')
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
	const key = request.url.slice(1)
	console.log(key)

	const archive = hyperdrive(ram, key)
	const sw = swarm(archive)

	sw.on('connection', (peer, type) => console.log(type))

	archive.ready(function () {
		const archiveStream = archive.replicate({ encrypt: false, live: true })

		pipe(
			stream,
			archiveStream,
			through(logger),
			stream,
			end
		)
	})
}

function logger (chunk, enc, next) {
	console.log('DATA', chunk)
	this.push(chunk)
	next()
}

function end (err) {
	if (err) return console.error(err)
  console.log('Socket Closed')
}

function listening (port) {
	return function (){
		console.log(`SERVER started on port: ${port}`)
	}
}
