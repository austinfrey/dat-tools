var html = require('choo/html')

var TITLE = 'example - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
			<button onclick=${onclick}>create drives</button>
    </body>
  `

  function onclick () {
		const drives = ['hello', 'goodbye', 'whatevs']
		drives.forEach(name => emit('drive-init', { name, key: false }))
  }
}
