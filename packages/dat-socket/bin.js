#! /usr/bin/env node

process.title = 'dat-socket'

const socket = require('.')

const port = process.argv[2]

socket(port)
