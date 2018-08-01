#! /usr/bin/env node

const socketClient = require('.')
const path = require('path')
const key = require(path.join(__dirname, './client-config.json')).key
const opts = require(path.join(__dirname, './client-config.json')).options
const url = require(path.join(__dirname, './client-config.json')).url || 'ws://localhost:3000'

socketClient(key, opts, `${url}/${key}`)


