### Dat Socket Client

A websocket client for replicating Dat's/Hyperdrive's

#### Usage
CLI
```bash
$ npm install -g @zigy/dat-socket-client
$ dat-socket-client
```

Programmatic API
`npm i --save @zigy/dat-socket-client`

```js
const socketClient = require('dat-socket-client')

// key is the Dat or Hyperdrive key you'd like to replicate
// opts are the replication options i.e. { live = true }
// url is the websocket URL
socketClient(key, opts, url)
```
