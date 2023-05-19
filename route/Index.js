const Module = require('kado/lib/Module')
const list = require('../animalList')

class Main extends Module {
  static register(app){
    const main = new Main(app)
    app.get('/', main.index.bind(main))
    app.post('/search', main.search.bind(main))
    app.post('/update', main.update.bind(main))
  }

  constructor (app) {
    super()
    this.app = app
    this.description = ''
    this.app.addModule(this)
  }

  async index (req, res) {
    try {
      const animalList = list
      const byAge = sortBy(animalList, 'age')
      const byName = sortBy(animalList, 'name')
      const byType = groupBy(animalList, 'type')
      const byColor = groupBy(animalList, 'color')
      const typeList = normalize(byType)
      const colorList = normalize(byColor)
      res.render('index', {
        animalList: list,
        byAge: byAge,
        byName: byName,
        typeList: typeList,
        colorList: colorList
      })
    } catch (err) {
      console.log(err)
      res.render('error', { error: err.message })
    }
  }

  async update (req, res){
    try {
      let animalList = null
      const data = req.body
      if(data.action === 'sort') {
        animalList = sortBy(list, data.property)
      } else if (data.action === 'group') {
        animalList = groupBy(list, data.property)
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
  }

  async search (req, res){
    try {
      const animals = list
      const term = req.body
      const animalList = searchBy(animals, term)
      res.json({
        success: true,
        status: 'ok',
        term: term,
        animalList: animalList
      })
    } catch (err) {
      console.log(err)
      res.render('error', { error: err.message })
    }
  }

}

function searchBy (animals, term) {
  return animals.filter(function(animal){
    for ( const val of Object.values(animal) ) {
      if( typeof val === 'string' ){
        if( val.toLowerCase().includes(term) ) return animal
      } else { return false }
    }
  });
}

function groupBy (animals, key) {
  return animals.reduce(function(rv, animal) {
    (rv[animal[key]] = rv[animal[key]] || []).push(animal)
    return rv
  }, {})
}

function sortBy (animals, property) {
  let sorted
  sorted = animals.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1
    }
    if (a[property] > b[property]) {
      return 1
    }
    return 0
  }, [])
  return sorted
}

function normalize (groups) {
  const list = []
  for (const [key, val] of Object.entries(groups)) {
    const obj = {}
    obj.group = key.toUpperCase()
    obj.animals = val
    list.push(obj)
  }
  return list
}

module.exports = Main