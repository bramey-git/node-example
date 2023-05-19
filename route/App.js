'use strict'
let app = null
class App {
  static register () {
    if (app) return app
    // declare error behavior
    process.on('unhandledRejection', function (err) {
      console.log(err)
      console.log(`FATAL ERROR (unhandled rejection): ${err.message}`)
      process.exit(211)
    })
    process.on('uncaughtException', function (err) {
      console.log(err)
      console.log(`FATAL ERROR (uncaught exception): ${err.message}`)
      process.exit(111)
    })
    // declare our application
    const Application = require('kado/lib/Application')
    const fs = require('kado/lib/FileSystem')
    const HyperText = require('kado/lib/HyperText')
    const pkg = require('../package')
    const animalList = require('../animalList')
    app = Application.getInstance()
    // load our modules
    app.setName(pkg.name)
    app.setVersion(pkg.version)
    const http = new Application.HyperText.HyperTextServer()
    app.http.addEngine('http', http.createServer(app.router))
    const viewFolder = fs.path.join(__dirname, '..', 'views')
    app.view.addEngine('mustache', new Application.View.ViewMustache(viewFolder))
    app.view.activateEngine('mustache')
    const staticRoot = fs.path.join(__dirname, '..', 'public')
    app.use(HyperText.StaticServer.getMiddleware(staticRoot))
    // install modules
    require('./Index').register(app)
    app.ensureStart = async function ensureStart () {
      clearTimeout(app.stopRequest)
      if (!app.started) {
        await app.start()
        await app.listen()
      }
      return app
    }
    app.requestStop = function requestStop () {
      app.stopRequest = setTimeout(async () => {
        await app.stop()
      }, 500)
      return app
    }
    return app
  }
}
module.exports = App
