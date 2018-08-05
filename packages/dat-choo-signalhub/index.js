const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const signalhub = require('signalhub')
const dataplex = require('dataplex')
const { pipe, through } = require('mississippi')
const swarm = require('webrtc-swarm')

function passInUrl (urlsArray) {
	return function datChooSignalhub (state, emitter) {
		state.mnt = state.mnt || {}

		emitter.on(state.events.DOMCONTENTLOADED, function () {
			const plex = dataplex()
			plex.add('/:key/:name', function (opts) {
				const { key, name } = opts
				const drive = state.mnt[name] || hyperdrive(ram, key)
				console.log('DRIVE', drive)

				return drive.replicate({ live: true })
			})

			const sw = swarm(signalhub('testing-dataplex', urlsArray))

			sw.on('peer', function (stream) {
				console.log('peer')
				pipe(stream, plex, stream)
			})

			emitter.on('drive-init', driveInit)

			function driveInit (info) {
				const { name, key } = info

				const drive = !!key
				? hyperdrive(ram, key)
				: hyperdrive(ram)

				drive.on('ready', function () {
					state.mnt[name] = drive
					const key = drive.key.toString('hex')
					const plexStream = plex.remote(`/${key}/${name}`)
					console.log(key)

					pipe(plexStream, logger(), drive.replicate({ live: true }), plexStream)
				})
			}

			function logger () {
				return through(function (chunk, enc, next) {
					console.log('DATA', chunk)
					this.push(chunk)
					next()
				})
			}
		})
	}
}

module.exports = passInUrl
