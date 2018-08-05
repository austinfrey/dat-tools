const html = require('choo/html')

function mountView (state, emit) {
	return html`
		<body>
		  <input id="name" type=text/>
		  <input id="key" type=text/>
			<button onclick=${onclick}>Mount Drive</button>
		</body>
	`

	function onclick () {
		const name = document.getElementById('name').value
		const key = document.getElementById('key').value

		emit('drive-init', { name, key })
	}
}

module.exports = mountView
