### Usage
use in a project
`npm install --save @zigy/dat-socket`

```js
const server = require('dat-socket')

const port = 8080
const cb = () => console.log(`server listening on port: ${port}`)

server(port, cb)
```

for global install
```bash
$ npm i -g @zigy/dat-socket
$ dat-socket
```
can optionally pass a port number, default is 3000
```bash
$ dat-socket 8080
```
