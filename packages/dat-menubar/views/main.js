const h = require('hyperscript')

module.exports = mainView

function mainView(state, emit) {
	return h('body', [
		h('h1.color-blue', 'DAT Socket'),
		h('div.w-50', [
			h('h4.dib.w-50', 'Enable DAT Socket'),
			h('a.br-pill.bn.bg-light-blue.dib.pa3.link.white.pointer', {
				onclick: toggleSocket
			}, 'ENABLE')
		]),
		h('div', [
			h('div', [
				h('input', {
					type: 'checkbox',
					name: 'live',
					value: 'live',
					id: 'live'
				}),
				h('label', {
					for: 'live'
				}, 'Live Sync')
			]),
			h('div', [
				h('input', {
					type: 'checkbox',
					name: 'encrypt',
					value: 'encrypt',
					id: 'encrypt',
					checked: true
				}),
				h('label', {
					for: 'encrypt'
				}, 'Encrypt Feeds')
			]),
			h('div', [
				h('input', {
					type: 'checkbox',
					name: 'download',
					value: 'download',
					id: 'download',
					checked: true
				}),
				h('label', {
					for: 'download'
				}, 'Download from peers')
			]),
			h('div', [
				h('input', {
					type: 'checkbox',
					name: 'upload',
					value: 'upload',
					id: 'upload',
					checked: true
				}),
				h('label', {
					for: 'upload'
				}, 'Upload to peers')
			])
		])
	])

	function toggleSocket() {
		const opts = {
			live: document.getElementById('live').checked,
			encrypt: document.getElementById('encrypt').checked,
			download: document.getElementById('download').checked,
			upload: document.getElementById('upload').checked
		}
		console.log('VIEW', opts)
		emit('socket-on', {on: !state.socketOn, opts})
	}
}
