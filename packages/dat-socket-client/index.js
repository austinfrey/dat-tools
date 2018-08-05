const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const websocket = require('websocket-stream')
const dataplex = require('dataplex')
const { pipe, through } = require('mississippi')

function socketClient (key, opts, url) {
	const socket = websocket(url)
	const plex = dataplex()

  const drive = hyperdrive(ram, key)

	if (typeof opts === 'string') {
		url = opts
		opts = {}
	}

	pipe(socket, plex, socket)

	drive.ready(function ready () {
		const stream = plex.open(`/${key}`)
		console.log('KEY', drive.key.toString('hex'))

	  pipe(stream, logger(), drive.replicate(opts), stream)

		function logger () {
			return through(function (chunk, enc, next) {
				console.log('DATA', chunk)
				this.push(chunk)
				next()
			})
		}
	})
}

module.exports = socketClient
