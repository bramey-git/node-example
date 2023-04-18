'use strict'
const cfg = {
  name: 'Node.js Examples',
  port: 3000,
  animalList: [
    {
      'type': 'Bear', 'name': 'Pal', 'color': 'brown', 'age': 12,
      'img': 'https://static.vecteezy.com/system/resources/previews/003/018/949/large_2x/close-up-portrait-of-tricolor-australian-shepherd-dog-lying-on-the-table-of-a-natural-eye-park-around-him-free-photo.jpeg'},
    {
      'type': 'Bird', 'name': 'Flight', 'color': 'purple', 'age': 2,
      'img': 'https://static.vecteezy.com/system/resources/previews/007/026/031/non_2x/splendid-sunbird-on-a-branch-free-photo.jpg'
    },
    {
      'type': 'Cat', 'name': 'Bud', 'color': 'brown', 'age': 7,
      'img': 'https://www.shutterstock.com/image-photo/closeup-british-shorthair-cat-20-260nw-745688395.jpg'
    },
    {
      'type': 'Cat', 'name': 'Guy', 'color': 'black', 'age': 5,
      'img': 'https://static.vecteezy.com/system/resources/previews/006/667/891/large_2x/black-cat-face-starring-outside-free-photo.jpg'
    },
    {
      'type': 'Chicken', 'name': 'Sanders', 'color': 'brown', 'age': 3,
      'img': 'https://static.vecteezy.com/system/resources/previews/015/605/798/non_2x/flat-lay-of-fried-wing-chicken-with-crispy-kaffir-lime-leaves-and-papaya-shredded-on-bowl-and-chili-sauce-on-brown-table-top-view-of-thai-food-with-fried-herb-and-vegetable-free-photo.jpg'
    },
    {
      'type': 'Dog', 'name': 'Saw', 'color': 'brown', 'age': 11,
      'img': 'https://static.vecteezy.com/system/resources/previews/022/796/058/non_2x/brown-dog-relax-and-sitting-in-the-garden-free-photo.jpg'
  },
    {
      'type': 'Dog', 'name': 'Drill', 'color': 'brown', 'age': 7,
      'img': 'https://static.vecteezy.com/system/resources/previews/022/880/957/large_2x/close-up-brown-smile-dog-isolated-on-white-background-with-a-clipping-path-free-photo.jpg'
    },
    {
      'type': 'Dog', 'name': 'Hammer', 'color': 'white', 'age': 8,
      'img': 'https://static.vecteezy.com/system/resources/previews/002/407/904/large_2x/portrait-of-arctic-wolf-free-photo.jpg'
    },
    {
      'type': 'Giraffe', 'name': 'Stretch', 'color': 'orange', 'age': 17,
      'img': 'https://static.vecteezy.com/system/resources/previews/002/044/768/non_2x/southern-giraffe-drinking-free-photo.jpg'
    },
    {
      'type': 'Horse', 'name': 'Spirit', 'color': 'white', 'age': 22,
      'img': 'https://static.vecteezy.com/system/resources/previews/005/020/751/non_2x/silhouette-of-a-large-white-horse-against-a-blue-sky-and-green-grass-free-photo.jpg'
    },
    {
      'type': 'Horse', 'name': 'Rider', 'color': 'black', 'age': 9,
      'img': 'https://static.vecteezy.com/system/resources/previews/022/906/401/non_2x/a-black-horse-from-the-front-running-in-a-fieldrealism-free-photo.jpg'
    },
    {
      'type': 'Tiger', 'name': 'JasmAlladin', 'color': 'orange', 'age': 25,
      'img': 'https://static.vecteezy.com/system/resources/previews/021/164/306/non_2x/of-a-siberian-tiger-free-photo.jpg'
    }
  ]
}

module.exports = cfg