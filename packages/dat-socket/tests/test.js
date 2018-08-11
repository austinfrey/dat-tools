const test = require('tape')
const DatSocket = require('..')
const http = require('http')

const server = http.createServer()

test('First test.', function (t) {
	t.plan(1)
	t.once('end', function () { server.close() }) // need this so tests don't hang when starting server

	const ds = new DatSocket()

	t.ok(ds instanceof DatSocket)
})
