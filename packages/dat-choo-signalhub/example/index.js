const css = require('sheetify')
const choo = require('choo')
const passInUrls = require('..')

css('tachyons')

const app = choo()

if (process.env.NODE_ENV === 'production') {
	app.use(require('choo-service-worker')())
} else {
	app.use(require('choo-devtools')())
}

const urls = ['http://localhost:8088']
const datChooSignalhub = passInUrls(urls)

app.use(datChooSignalhub)

app.route('/', require('./views/main'))

module.exports = app.mount('body')

