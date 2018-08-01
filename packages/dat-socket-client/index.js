const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const websocket = require('websocket-stream')
const { pipe } = require('mississippi')

module.exports = function socketClient (key, opts, url) {
	const socket = websocket(url)
  const drive = hyperdrive(key)

	if (typeof opts === 'string') {
		url = opts
		opts = {}
	}

	pipe(
		socket,
		drive.replicate(opts),
		socket
	)

	drive.on('end', function () {
		socket.close()
		drive.finalize()
	})
}




