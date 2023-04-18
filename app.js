'use strict'
const Application = require('kado')
const fs = require('kado/lib/FileSystem')
const HyperText = require('kado/lib/HyperText')

const pkg = require('./package')
const cfg = require('./config')

const app = Application.getInstance()

app.setName(pkg.name)
app.setVersion(pkg.version)
const http = new Application.HyperText.HyperTextServer()
app.http.addEngine('http', http.createServer(app.router))
const viewFolder = fs.path.join(__dirname, 'views')
app.view.addEngine('mustache', new Application.View.ViewMustache(viewFolder))
app.view.activateEngine('mustache')
const staticRoot = fs.path.join(__dirname, 'public')
app.use(HyperText.StaticServer.getMiddleware(staticRoot))

app.get('/', async (req, res) => {
  const animalList = Array.from(cfg.animalList)
  const byAge = Array.from(await sortBy(animalList, 'age'))
  const byName = Array.from(await sortBy(animalList, 'name'))
  const byType = await groupBy(animalList, 'type')
  const byColor = await groupBy(animalList, 'color')
  const typeList = normalize(byType)
  const colorList = normalize(byColor)
  res.render('index', {
    animalList: cfg.animalList,
    byAge: byAge,
    byName: byName,
    typeList: typeList,
    colorList: colorList
  })
})

app.post('/update', async (req, res) => {
  try {
    let animalList = null
    const data = req.body
    if(data.action === 'sort') {
      animalList = Array.from(await sortBy(cfg.animalList, data.property))
    } else if (data.action === 'group') {
      animalList = await groupBy(cfg.animalList, data.property)
      animalList = normalize(animalList)
    } else {
      new Error('Action not selected')
    }
    res.json({
      success: true,
      status: 'ok',
      display: data.action,
      animalList: animalList
    })
  } catch (err) {
    console.log(err)
    res.render('error', { error: err.message })
  }
})

const groupBy = function(animals, key) {
  return animals.reduce(function(rv, animal) {
    (rv[animal[key]] = rv[animal[key]] || []).push(animal)
    return rv
  }, {})
}

const sortBy = function(animals, property) {
  let sorted
  sorted = animals.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1
    }
    if (a[property] > b[property]) {
      return 1
    }
    return 0
  })
  return sorted
}

const normalize = function(groups) {
  const list = []
  for (const [key, val] of Object.entries(groups)) {
    const obj = {}
    obj.group = key.toUpperCase()
    obj.animals = val
    list.push(obj)
  }
  return list
}

app.start().then(() => { return app.listen() })