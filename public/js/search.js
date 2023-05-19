/* global $ */
$(document).ready(() => {
  $('#search').keyup(function(){
    const term = $.trim($(this).val()).replace(/ +/g,' ').toLowerCase()
    return search(term)
  })
})

async function search (term) {
  try {
    const cards = $('div#animal-cards')
    let response = await fetch('/search',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(term),
    })
    response = await response.json()
    if (response.success) {
      cards.empty()
      cards.append('<h3 class="text-center">Search results for: ' + response.term + ' </b></h3>')
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
  } catch (err) {
    console.error('There has been a problem with your fetch operation: ', err);
  }
}