# `dat-choo-signalhub`

code stolen from `joehand/hyperdb-web-example`

> A Choo store component that creates a hyperdrive and replicates via
> WebRTC.

## Usage

```js
const choo = require('choo')
const passInUrls = require('dat-choo-signalhub')

const app = choo()

const url = [
  'http://signalhub-1.url',
	'http://signalhub-2.url'
]

const datChooSignalhub = passInUrls(urls)

app.use(datChooSignalhub)

//initialize hyperdrive in one browser
app.route('/', require('./views/mainView'))

//replicate the hyperdrive in another client at url.com/<hyperdrive key>
app.route('/:key', require('./views/replicateView'))

app.mount('body')
```

The hyperdrive archive is attached to the app `state` object and is
available at `state.drive`
