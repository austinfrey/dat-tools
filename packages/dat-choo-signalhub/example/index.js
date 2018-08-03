const css = require('sheetify')
const choo = require('choo')
const passInUrls = require('..')

css('tachyons')

const app = choo()

process.env.NODE_ENV !== 'production'
? app.use(require('choo-devtools')())
: app.use(require('choo-service-worker')())

const urls = ['http://localhost:8088']
const datChooSignalhub = passInUrls(urls)

app.use(datChooSignalhub)

app.route('/', require('./views/main'))
app.route('/:key', require('./views/key'))

module.exports = app.mount('body')


