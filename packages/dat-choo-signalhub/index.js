const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const signalhub = require('signalhub')
const dataplex = require('dataplex')
const {pipe, through} = require('mississippi')
const swarm = require('webrtc-swarm')

module.exports = passInUrl

function passInUrl(urlsArray) {
	return function (state, emitter) {
		state.mnt = state.mnt || {}

		emitter.on(state.events.DOMCONTENTLOADED, () => {
			const plex = dataplex()
			const sw = swarm(signalhub('testing-dataplex', urlsArray))

			sw.on('peer', peer => pipe(peer, plex, peer))

			emitter.on('drive-init', driveInit)
			emitter.on('drive-sync', driveSync)

			plex.add('/:key', opts => {
				const {key} = opts
				const drive = state.mnt[key] || createDrive()

				function createDrive() {
					const drive = hyperdrive(ram, key)
					state.mnt[key] = drive
					return drive
				}

				return drive.replicate({live: true})
			})

			function driveInit(key) {
				const drive = key ? hyperdrive(ram, key) : hyperdrive(ram)

				drive.on('ready', () => {
					const key = drive.key.toString('hex')
					state.mnt[key] = drive
				})
			}

			function driveSync(key) {
				const drive = hyperdrive(ram, key)

				function onReady() {
					const key = drive.key.toString('hex')
					const plexStream = plex.remote(`/${key}`)
					state.mnt[key] = drive

					pipe(
						plexStream,
						logger(),
						drive.replicate({live: true}),
						plexStream
					)
				}

				drive.ready(onReady)
			}

			function logger() {
				return through(function (chunk, enc, next) {
					console.log('DATA', chunk)
					this.push(chunk)
					next()
				})
			}
		})
	}
}

