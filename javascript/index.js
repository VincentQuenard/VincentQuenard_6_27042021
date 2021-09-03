/* Constante qui récupère les données de photopgraphes.json */

const linkToJson = './photographes.json';
/*fetch va faire une requête au fichier json si ok alors .then et exécution de la fonction, sinon erreur .catch*/
fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    if (data.photographers != undefined)
      data.photographers.forEach((Elphoto) => {
        createPhotographe(Elphoto);
      });
  })
  .catch(function (err) {
    console.log('Erreur' + err);
  });

/*fonction de création des tags*/
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
/* fonction qui va créer le code html d'un photographe en fonction de ses données du fichier json*/
function createPhotographe(Elphoto) {
  let decriptionPhotographe = document.createElement('section');
  decriptionPhotographe.classList.add('photographe_description');
  document
    .querySelector('#photographe_container')
    .appendChild(decriptionPhotographe);
  decriptionPhotographe.innerHTML =
    '<a class="photographe_link" href="./pagePhotographe.html?id=' +
    Elphoto.id +
    '"" aria-label="' +
    Elphoto.name +
    '">' +
    '<img class="photographe_portrait" src="' +
    Elphoto.portrait +
    '"alt="' +
    Elphoto.alt +
    '">' +
    '<h2 class="photographe_name">' +
    Elphoto.name +
    '</h2>' +
    '</a>' +
    '<p class="photographe_localisation">' +
    Elphoto.city +
    ' , ' +
    Elphoto.country +
    '</p>' +
    '<p class="photographe_words">' +
    Elphoto.tagline +
    '</p>' +
    '<p class="photographe_price">' +
    Elphoto.price +
    '€/jour</p>' +
    '<ul class="tag_list filter_mobile">' +
    /*appel de la fonction créant les tags en fonction du retour contenu dans le fichier .json*/
    createTag(Elphoto.tags);
  '</ul>' + '</section>';
}

//Bouton passer au contenu
const headerscroll = document.querySelector('.header_scroll');

window.addEventListener('scroll', () => {
  if (window.scrollY > 70) {
    headerscroll.style.display = 'block';
  } else {
    headerscroll.style.display = 'none';
  }
});
