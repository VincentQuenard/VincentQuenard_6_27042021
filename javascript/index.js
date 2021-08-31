const linkToJson = './photographes.json';

fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    if (data.photographers != undefined)
      data.photographers.forEach((Element) => {
        createPhotographe(Element);
      });
  })
  .catch(function (err) {
    console.log('Erreur' + err);
  });

function createTag(elementTag) {
  let result = '';
  elementTag.forEach((tag) => {
    result +=
      '<li>' +
      '<span class="sr_only">Tag link</span>' +
      '<a class="tag_link" href="#">#' +
      tag +
      '</a>' +
      '</li>';
  });
  return result;
}

function createPhotographe(Element) {
  let decriptionPhotographe = document.createElement('section');
  decriptionPhotographe.classList.add('photographe_description');
  document
    .querySelector('#photographe_container')
    .appendChild(decriptionPhotographe);
  decriptionPhotographe.innerHTML =
    '<a class="photographe_link" href="./pagePhotographe.html?id=' +
    Element.id +
    '"" aria-label="' +
    Element.name +
    '">' +
    '<img class="photographe_portrait" src="' +
    Element.portrait +
    '"alt="' +
    Element.alt +
    '">' +
    '<h2 class="photographe_name">' +
    Element.name +
    '</h2>' +
    '</a>' +
    '<p class="photographe_localisation">' +
    Element.city +
    ' , ' +
    Element.country +
    '</p>' +
    '<p class="photographe_words">' +
    Element.tagline +
    '</p>' +
    '<p class="photographe_price">' +
    Element.price +
    '€/jour</p>' +
    '<ul class="tag_list filter_mobile">' +
    createTag(Element.tags);
  '</ul>' + '</section>';
}
