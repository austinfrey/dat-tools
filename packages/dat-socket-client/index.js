const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const websocket = require('websocket-stream')
const { pipe } = require('mississippi')

function socketClient (key, opts, url) {
	const socket = websocket(url)
  const drive = hyperdrive(ram, key)

	if (typeof opts === 'string') {
		url = opts
		opts = {}
	}

	drive.ready(function ready () {
		console.log('KEY', drive.key.toString('hex'))
	  const driveStream = drive.replicate(opts)

		pipe(
			socket,
			driveStream,
			socket
		)

		driveStream.on('end', function () {
			console.log('ENDED')
			//socket.close()
			//drive.finalize()
		})
	})

}

module.exports = socketClient
