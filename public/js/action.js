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

function processData (data) {
  const cards = $('div#animal-cards')
  $.ajax('/update', {
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(data),
    success: function (res) {
      if (res.status === 'ok') {
        cards.empty()
        if(res.display === 'group') {
          res.animalList.forEach((row) => {
            cards.append('<p><b>Group: ' + row.group + ' </b></p>')
            row.animals.forEach((animal) => {
              cards.append(
                '<div class="col-md-3 mb-3">' +
                  '<div class="card">' +
                    '<div class="card-body tile rounded-3 text-center bg-gradient">' +
                      '<img src="' + animal.img + '" width="64" height="64" class="rounded-circle flex-shrink-0">' +
                      '<h5 class="card-title"> ' + animal.name + ' the ' + animal.type + ' </h5>' +
                      '<p class="card-text">Color: ' + animal.color + ',  Age: ' +animal.age + '</p>' +
                    '</div>' +
                  '</div>' +
                '</div>'
              )
            })
          })
        } else if (res.display) {
          res.animalList.forEach((row) => {
            cards.append(
              '<div class="col-md-3 mb-3">' +
                '<div class="card">' +
                  '<div class="card-body tile rounded-3 text-center bg-gradient">' +
                    '<img src="' + row.img + '" width="64" height="64" class="rounded-circle flex-shrink-0">' +
                    '<h5 class="card-title"> ' + row.name + ' the ' + row.type + ' </h5>' +
                    '<p class="card-text">Color: ' + row.color + ',  Age: ' +row.age + '</p>' +
                  '</div>' +
                '</div>' +
              '</div>'
            )
          })
        }
      } else {
        console.log('ERROR: ' + res.message)
      }
    }
  })
}

