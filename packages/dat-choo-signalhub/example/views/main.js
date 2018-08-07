const html = require('choo/html')

const TITLE = 'example - main'

module.exports = view

function view(state, emit) {
	if (state.title !== TITLE) {
		emit(state.events.DOMTITLECHANGE, TITLE)
	}

	return html`
    <body class="code lh-copy">
			<button onclick=${onclick}>create drives</button>
		  <input id="key" type=text/>
			<button onclick=${onmount}>Mount Drive</button>
    </body>
  `

	function onclick() {
		const drives = ['hello', 'goodbye', 'whatevs']
		drives.forEach(() => emit('drive-init', false))
	}

	function onmount() {
		const key = document.getElementById('key').value

		emit('drive-sync', key)
	}
}
