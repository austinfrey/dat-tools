#! /usr/bin/env node

process.title = 'dat-socket'

const http = require('http')
const DatSocket = require('.')
const loadSocketDetails = require('./lib/router')

const server = http.createServer(handler)
const port = process.env.PORT
const ds = new DatSocket()
const router = loadSocketDetails(ds)

function handler(req, res) {
  var m = router.match(req.method + ' ' + req.url)
  if (m) m.fn(req,res,m)
}

ds.createServer(server, () => console.log('ws server installed'))

server.listen(port, () => console.log('listening on port:', port))
