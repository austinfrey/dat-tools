const Router = require('routes')
const router = Router()

function loadSocketDetails (socket) {
  router.addRoute('GET /stats', getStats)

  function getStats (req, res) {
    res.end(socket.connections.toString())
  }

  return router
}

module.exports = loadSocketDetails

