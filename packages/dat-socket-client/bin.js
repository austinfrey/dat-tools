#! /usr/bin/env node

const path = require('path')
const socketClient = require('.')

const {key, options} = require(path.join(__dirname, './client-config.json'))
const url = require(path.join(__dirname, './client-config.json')).url || 'ws://localhost:3000'

const client = socketClient(url)

client(key, options)

