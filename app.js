'use strict'
const cfg = require('./config')

const app = require('./route/App.js').register(cfg)

app.start().then(() => {
  console.log('App Listening')
  return app.listen()
})