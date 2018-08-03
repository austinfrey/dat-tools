var html = require('choo/html')

var TITLE = 'example - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
			<h1>Initializing Drive...</h1>
    </body>
  `

  function handleClick () {
    emit('clicks:add', 1)
  }
}
