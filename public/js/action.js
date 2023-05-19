/* global $ */
$(document).ready(() => {
  const data = {}
  $('#sort li button').on('click', function(){
    data.property = ($(this).val())
    data.action = 'sort'
    return processData(data)
  })
  $('#group li button').on('click', function(){
    data.property = ($(this).val())
    data.action = 'group'
    return processData(data)
  })
})

async function processData (data) {
  try {
    const cards = $('div#animal-cards')
    let response = await fetch('/update',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
    response = await response.json()
    console.log(response)
    if (response.success) {
      cards.empty()
      cards.append('<h3 class="text-center">Animals ' + response.display + 'ed by '+ data.property +' </b></h3>')
      if(response.display === 'group') {
        response.animalList.forEach((row) => {
          cards.append('<p><b>'+ data.property.toUpperCase() +': ' + row.group + ' </b></p>')
          row.animals.forEach((animal) => {
            cards.append(
              '<div class="col-md-4 mb-4">' +
              '<div class="card">' +
              '<div class="card-body tile rounded-3 text-center bg-gradient">' +
              '<img src="' + animal.img + '" width="72" height="72" class="rounded-circle flex-shrink-0">' +
              '<h5 class="card-title"> ' + animal.name + ' the ' + animal.type + ' </h5>' +
              '<p class="card-text">Color: ' + animal.color + ',  Age: ' +animal.age + '</p>' +
              '</div>' +
              '</div>' +
              '</div>'
            )
          })
        })
      } else if (response.display) {
        response.animalList.forEach((row) => {
          cards.append(
            '<div class="col-md-4 mb-4">' +
            '<div class="card">' +
            '<div class="card-body tile rounded-3 text-center bg-gradient">' +
            '<img src="' + row.img + '" width="72" height="72" class="rounded-circle flex-shrink-0">' +
            '<h5 class="card-title"> ' + row.name + ' the ' + row.type + ' </h5>' +
            '<p class="card-text">Color: ' + row.color + ',  Age: ' +row.age + '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
          )
        })
      }
    }
  } catch (err) {
    console.error('There has been a problem with your fetch operation: ', err);
  }
}

