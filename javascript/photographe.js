const linkToJson = './photographes.json';
let element;

let params = new URL(document.location).searchParams;
let idURL = params.get('id');

fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    // console.log(data);
    if (data.photographers != undefined)
      data.photographers.forEach((Elphoto) => {
        //console.log(Elphoto);
        /* Si l'id contenu dans l'url est la même que celle du photgraphe, afficher banner du photographe */
        if (idURL == Elphoto.id) {
          banner_photographe(Elphoto);

          /* Ajout du prix du photographe affiché par jour  */
          let price_day = document.createElement('span');
          price_day.setAttribute('id', 'price_day');
          document.querySelector('#likes_price').appendChild(price_day);
          price_day.innerHTML += `${Elphoto.price}€ / jour`;
        }
      });

    if (data.media != undefined) element = data.media;

    data.media.forEach((Elmedia) => {
      //Si l'id contenu dans l'url == au photographeID du media)
      if (idURL == Elmedia.photographerId) {
        let trilikes = Elmedia.likes;
        console.log(trilikes);
        media_photographe(Elmedia);
        clickJaime(Elmedia);
      }
    });
    totalLikes(data.media);
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
      '<a class="tag_link photographe_page" href="#">#' +
      tag +
      '</a>' +
      '</li>';
  });
  return result;
}

/* fonction qui va créer le code html de la banner du photogrpahe */
function banner_photographe(Elphoto) {
  let banner_photographe = document.createElement('div');
  banner_photographe.classList.add('banner_photographe_description');
  document
    .querySelector('.banner_photographe_container')
    .appendChild(banner_photographe);
  banner_photographe.innerHTML =
    '<h1 class="banner_photographe_nom">' +
    Elphoto.name +
    '</h1>' +
    '<p class="banner_photographe_localisation">' +
    Elphoto.city +
    ' , ' +
    Elphoto.country +
    '</p>' +
    '<p class="banner_photographe_words">' +
    Elphoto.tagline +
    '</p>' +
    '<ul class="banner_photographe_filter">' +
    createTag(Elphoto.tags);
  '</ul>' + '</div>';

  let banner_button = document.createElement('button');
  banner_button.classList.add('banner_photographe_button');
  banner_button.setAttribute('aria-label', 'Contact Me');
  banner_button.innerHTML = 'Contactez-moi';
  document
    .querySelector('.banner_photographe_container')
    .appendChild(banner_button);

  let banner_img = document.createElement('div');
  banner_img.classList.add('banner_photographe_img_container');
  document
    .querySelector('.banner_photographe_container')
    .appendChild(banner_img);
  banner_img.innerHTML +=
    '<img class="banner_photographe_img" src="' +
    Elphoto.portrait +
    '"alt="' +
    Elphoto.alt +
    '">';
}

/*Fonction qui va créer les médias des photographes choix si video ou img dans le .json*/
function media_photographe(Elmedia) {
  let media_photographe = document.createElement('div');
  media_photographe.classList.add('media_photographe');
  document.querySelector('.medias_photographe').appendChild(media_photographe);
  media_photographe.innerHTML =
    choix_media(Elmedia) +
    '<div class="media_texte">' +
    '<p class="media_title">' +
    Elmedia.title +
    '</p>' +
    '<div class="media_heart" aria-label="likes">' +
    '<p class="nb_likes" id=' +
    Elmedia.id +
    '>' +
    Elmedia.likes +
    '</p>' +
    '<div class="coeur">' +
    '<i  onclick = "clickJaime (' +
    Elmedia.id +
    ')"  class="far fa-heart"></i>' +
    '</div>' +
    '</div>' +
    '</div>';
}

// Fonction qui affiche soit video ou soit photo en fonction du media json
function choix_media(Elmedia) {
  if (Elmedia.image) {
    return (
      '<img class="media" src="' +
      Elmedia.image +
      '" alt="' +
      Elmedia.alt +
      '">'
    );
  } else if (Elmedia.video) {
    return (
      '<video controls class="media">' +
      '<source src="' +
      Elmedia.video +
      '" type=video/mp4>' +
      '</video> '
    );
  }
}

//injection de la bannière total deslikes
let total_likes = document.createElement('span');
total_likes.setAttribute('id', 'likes');
document.querySelector('#likes_price').appendChild(total_likes);
total_likes.innerHTML = '<p id="total_likes">';
'</p>' + '<i class="far fa-heart total"></i>';

//Fonction qui va incrémenter le nombre de likes au clic sur les coeurs
function clickJaime(id) {
  element.forEach((addLike) => {
    if (addLike.id == id) {
      addLike.likes += 1;
      document.getElementById(id).innerHTML = addLike.likes;
    }
  });
  totalLikes(element);
}

//fonction qui va faire la somme des likes et s'incrémenter s'il y a un clic sur un coeur
function totalLikes(element) {
  let somme = 0;
  element.forEach((aime) => {
    if (aime.photographerId == idURL) {
      somme += aime.likes;
    }
  });
  document.getElementById('total_likes').innerHTML = somme;
}

// tri par popularité, date ou titre
let elt = document.querySelector('select');
elt.addEventListener('change', function () {
  console.log('value => ' + this.value);
});

/*let selection = document.querySelector('.dropdown');
console.log(selection);*/

/*Les objets peuvent être triés d'après les valeurs d'une de leurs propriétés.

var items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 }
];
items.sort(function (a, b) {
  return a.value - b.value;
});*/

/*          
            <!--insertion des médias du photographe en JS-->

               <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Animals_Rainbow.jpg" alt="Animals Rainbow">
                <div class="media_texte">
                    <p class="media_title">Animals Rainbow</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">59</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="media_photographe">
                <video controls class="media">
                    <source src="./images/MimiID243/Animals_Wild_Horses_in_the_mountains.mp4" type=video/mp4>
                </video> 
                <div class="media_texte">
                    <p class="media_title">Wild_Horses</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">142</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

           */
