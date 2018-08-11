#! /usr/bin/env node

process.title = 'dat-socket'

const http = require('http')
const DatSocket = require('.')

const server = http.createServer()
const port = process.argv[2]

const ds = new DatSocket()

ds.createServer(server, () => console.log('ws server installed'))

server.listen(port, () => console.log('listening on port:', port))
