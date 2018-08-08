const EventEmitter = require('events')
const test = require('tape')
const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const swarm = require('hyperdiscovery')
const datSocketClient = require('../')
const datSocket = require('@zigy/dat-socket')

const url = 'ws://localhost:3000'
const client = datSocketClient(url)
const server = datSocket(3000)

const drive = hyperdrive(ram)
const noop = () => {}

drive.ready(function () {
	const key = drive.key.toString('hex')
	const { socket, drive: clientDrive, bus } = client(key)

	test('Is the shape of the returned object correct?',  function (t) {
		t.plan(3)
		t.equal(socket.readable, true)
		t.equal(clientDrive instanceof hyperdrive, true)
		t.equal(bus instanceof EventEmitter, true)
	})

	bus.on('ready', () => {
		test('Does live replication work?', function (t) {
			const sw = swarm(drive)

			t.plan(2)

			clientDrive.db.watch(() => {
				clientDrive.readdir('/', (err, files) => {
					if (err) throw err
					t.equal(files[0], 'dog')
					t.end()
					process.exit()
				})
			})

			drive.writeFile('dog', 'cat', function (err) {
				if (err) throw err
				t.ok(true)
			})

			sw.on('peer', noop)
		})
	})
})
