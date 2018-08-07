const css = require('sheetify')
const choo = require('choo')
const passInUrl = require('..')

css('tachyons')

const app = choo()

if (process.env.NODE_ENV === 'production') {
	app.use(require('choo-service-worker')())
} else {
	app.use(require('choo-devtools')())
}

const url = 'ws://localhost:3000'
const datChooWebsocket = passInUrl(url)

app.use(datChooWebsocket)

app.route('/', require('./views/main'))

module.exports = app.mount('body')

