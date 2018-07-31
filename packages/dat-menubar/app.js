const choo = require('choo')
const css = require('sheetify')

const app = choo()

css('dat-colors')
css('tachyons')

app.use(require('./stores/socket'))

app.route('/', require('./views/main'))

app.mount('body')
