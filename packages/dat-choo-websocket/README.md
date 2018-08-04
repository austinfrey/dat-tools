# `dat-choo-websocket`

code stolen from `joehand/hyperdb-web-example`

> A Choo store component that creates a hyperdrive and replicates via
> Websockets.

## Usage

```js
const choo = require('choo')
const passInUrl = require('dat-choo-websocket')

const app = choo()

const url = 'ws://localhost:3000'

const datChooWebsocket = passInUrl(url)

app.use(datChooWebsocket)

//initialize hyperdrive in one browser
app.route('/', require('./views/mainView'))

//replicate the hyperdrive in another client at url.com/<hyperdrive key>
app.route('/:key', require('./views/replicateView'))

app.mount('body')
```

The hyperdrive archive is attached to the app `state` object and is
available at `state.drive`
