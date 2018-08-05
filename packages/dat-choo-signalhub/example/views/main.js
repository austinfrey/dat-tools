var html = require('choo/html')

var TITLE = 'example - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
			<button onclick=${onclick}>create drives</button>
		  <input id="name" type=text/>
		  <input id="key" type=text/>
			<button onclick=${onmount}>Mount Drive</button>
    </body>
  `

  function onclick () {
		const drives = ['hello', 'goodbye', 'whatevs']
		drives.forEach(name => emit('drive-init', { name, key: false }))
  }

	function onmount () {
		const name = document.getElementById('name').value
		const key = document.getElementById('key').value

		emit('drive-init', { name, key })
	}
}
