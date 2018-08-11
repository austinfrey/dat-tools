#! /usr/bin/env node

const path = require('path')
const socketClient = require('.')

const key = process.argv[2]
const options = { live: true }
const url = 'ws://localhost:3000'

const client = socketClient(url)

client(key, options)

