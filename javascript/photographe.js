const linkToJson = './photographes.json';
let element;
let tableau_medias = [];
let mediaActive = '';
const bg_lightbox = document.querySelector('.lightbox_container');
const close_lightbox = document.querySelector('.close_bigger');
const links = document.querySelectorAll('.media');
const lightboxMediaBox = document.querySelector('.lightbox_media_box');
//On injecte la fonction qui définira si photo ou video
function affichageLightbox(currentMedia) {
  lightboxMediaBox.innerHTML = bigMediaLightbox(currentMedia);
}
console.log(links);
//récupération de l'url
let params = new URL(document.location).searchParams;
//récupération de l'id spécifique à chaque photographe
let idURL = params.get('id');

window.addEventListener('load', () => {
  fetch(linkToJson)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      //On recupère dans la constante les médias propres au photographe
      let photographerMedias = data.media.filter((media) => {
        return idURL == media.photographerId;
      });

      // partie du fech pour les informations du photographe à afficher dans la banière à partir du json
      if (data.photographers != undefined)
        data.photographers.forEach((Elphoto) => {
          /* Si l'id contenu dans l'url est la même que celle du photographe, afficher banner du photographe */
          if (idURL == Elphoto.id) {
            banner_photographe(Elphoto);

            //MODAL

            //changement du nom de contact en fonction du photographe affiché
            let name_banner = document.querySelector('.title-photographe');
            name_banner.innerHTML = Elphoto.name;

            // DOM Elements
            const modalbg = document.querySelector('.background_modal');
            const modalBtn = document.querySelector(
              '.banner_photographe_button'
            );
            const buttonClose = document.querySelector('.close_modal');

            //sélection des balises du formulaires

            const formulaire = document.getElementById('formulaire');
            const prenom = document.getElementById('prenom');
            const erreur_prenom = document.getElementById('erreur_prenom');
            const nom = document.getElementById('nom');
            const erreur_nom = document.getElementById('erreur_nom');
            const messagerie = document.getElementById('email');
            const erreur_messagerie = document.getElementById('erreur_email');
            const message = document.getElementById('message');
            const erreur_message = document.getElementById('erreur_message');
            const envoi_formulaire = document.querySelector('.btn_submit');

            //Regex
            const regexLettres = /^[a-zA-Z-\s]+$/;
            const regexMessagerie =
              /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

            // ouverture formulaire au clic sur bouton 'contactez-moi'
            modalBtn.addEventListener('click', () => {
              modalbg.style.display = 'block';
            });

            // fermeture formulaire au clic sur la croix
            buttonClose.addEventListener('click', () => {
              modalbg.style.display = 'none';
            });
            // fermeture formulaire au clavier en appuyant sur échap
            window.addEventListener('keydown', function (e) {
              if (e.key == 'Escape') {
                modalbg.style.display = 'none';
              }
            });

            //Vérifications entrées formulaire
            formulaire.addEventListener('submit', (e) => {
              /*verification le prénom est vide ou à moins de 2 charactères ou contient des chiffres*/
              if (
                prenom.value === 0 ||
                prenom.value.length <= 2 ||
                regexLettres.test(prenom.value) == false
              ) {
                erreur_prenom.textContent =
                  'Le prénom doit comporter 2 charactères minimum sans accent et uniquement des lettres.';
                erreur_prenom.style.fontSize = '1rem';
                erreur_prenom.style.color = 'red';
                erreur_prenom.style.marginBottom = '1rem';
              } else {
                erreur_prenom.textContent = ''; //pas d'erreur donc pas de message
              }

              /*verification le nom est vide ou à moins de 2 charactères ou contient des chiffres*/

              if (
                nom.value === 0 ||
                nom.value.length <= 2 ||
                regexLettres.test(nom.value) == false
              ) {
                erreur_nom.textContent =
                  'Le nom doit comporter 2 charactères minimum sans accent et uniquement des lettres.';
                erreur_nom.style.fontSize = '1rem';
                erreur_nom.style.color = 'red';
                erreur_nom.style.marginBottom = '1rem';
              } else {
                erreur_nom.textContent = ''; //pas d'erreur donc pas de message
              }

              //verification email valide

              if (regexMessagerie.test(messagerie.value)) {
                // test regex mail ok
                erreur_messagerie.textContent = '';
                // Pas d'erreur
              } else {
                // Caractère absent ou ne répondant pas aux conditions du regex
                erreur_messagerie.textContent =
                  'Veuillez entrer une adresse de messagerie valide';
                erreur_messagerie.style.fontSize = '1rem';
                erreur_messagerie.style.color = 'red';
                erreur_messagerie.style.marginBottom = '1rem';
              }

              //verification message non vide
              if (message.value === 0 || message.value.length <= 10) {
                erreur_message.textContent =
                  'Veuillez entrer un message de 10 charactères minimums';
                erreur_message.style.fontSize = '1rem';
                erreur_message.style.color = 'red';
                erreur_message.style.marginBottom = '1rem';
              } else {
                erreur_message.textContent = ''; //pas d'erreur donc pas de message
              }

              e.preventDefault(); //bloque l'envoi automatique du formulaire s'il n'est pas correctement rempli

              //Envoi formulaire au clic sur bouton envoyer si tout le formulaire est ok
              envoi_formulaire.addEventListener('click', () => {
                if (
                  prenom.value &&
                  nom.value &&
                  messagerie.value &&
                  message.value
                ) {
                  console.log(prenom.value);
                  console.log(nom.value);
                  console.log(messagerie.value);
                  console.log(message.value);
                  modalbg.style.display = 'none';
                }
              });
            });

            //FIN  MODAL

            /* Ajout du prix du photographe affiché par jour  */
            let price_day = document.createElement('span');
            price_day.setAttribute('id', 'price_day');
            document.querySelector('#likes_price').appendChild(price_day);
            price_day.innerHTML += `${Elphoto.price}€ / jour`;
          }
        });

      //Partie du fetch pour l'affichage et les actions sur la partie média des photographes
      if (data.media != undefined) element = data.media;

      data.media.forEach((Elmedia) => {
        //Si l'id contenu dans l'url == au photographeID du media)
        if (idURL == Elmedia.photographerId) {
          //Affichage des médias propres à chaque photographe
          media_photographe_display(Elmedia);
          //Incrémentation des likes au click
          clickJaime(Elmedia);
          tableau_medias.push(Elmedia);
        }
      });
      totalLikes(data.media);

      //LIGHTBOX

      // ouverture lighbox en cliquant sur un media et affichage de ce média
      function openLightbox() {
        links.forEach((link, index) => {
          link.addEventListener('click', () => {
            mediaActive = index;
            bg_lightbox.style.display = 'block';
            affichageLightbox(photographerMedias[mediaActive]);
          });
        });
      }
      openLightbox();

      //clic flèche suivant
      const arrowRight = function () {
        console.log(mediaActive);
        mediaActive++;
        if (mediaActive === photographerMedias.length) {
          mediaActive = 0;
        }
        affichageLightbox(photographerMedias[mediaActive]);
      };
      document
        .querySelector('.arrow_right')
        .addEventListener('click', function () {
          arrowRight();
        });

      //clic flèche précédente
      const arrowLeft = function () {
        console.log(mediaActive);
        console.log(photographerMedias.length);
        mediaActive--;
        if (mediaActive < 0) {
          mediaActive == photographerMedias.length;
        }
        affichageLightbox(photographerMedias[mediaActive]);
      };
      document
        .querySelector('.arrow_left')
        .addEventListener('click', function () {
          arrowLeft();
        });

      // fermeture lightbox au clic sur la croix et on cache le dernier média affiché
      function CloseLightbox() {
        close_lightbox.addEventListener('click', () => {
          bg_lightbox.style.display = 'none';
        });
      }
      CloseLightbox();

      //navigation au clavier, fleches gauche et droite, touche échap pour sortir
      window.addEventListener('keydown', function (e) {
        console.log(e);
        if (e.key == 'ArrowRight') {
          arrowRight();
        }
        if (e.key == 'ArrowLeft') {
          arrowLeft();
        }
        if (e.key == 'Escape') {
          bg_lightbox.style.display = 'none';
        }
      });
    })
    .catch(function (err) {
      console.log('Erreur' + err);
    });
});

/*fonction de création des tags*/
function createTag(elementTag) {
  let result = '';
  elementTag.forEach((tag) => {
    result +=
      '<li>' +
      '<span class="sr_only">Tag link</span>' +
      '<a class="tag_link photographe_page" data-filter="' +
      tag +
      '" href="../index.html?tag=' +
      tag +
      '">#' +
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
function media_photographe_display(Elmedia) {
  // console.log(Elmedia.title);
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
  /*media_photographe.addEventListener('click', () => {
    const bg_lightbox = document.querySelector('.lightbox_container');

    const lightboxMediaBox = document.querySelector('.lightbox_media_box');
    lightboxMediaBox.innerHTML = bigMediaLightbox(Elmedia);
    bg_lightbox.style.display = 'block';
  });*/
}

// Fonction qui affiche soit video ou soit photo en fonction du media json
function choix_media(Elmedia) {
  if (Elmedia.image) {
    return (
      '<img class="media" src="' +
      Elmedia.image +
      '" alt="' +
      Elmedia.alt +
      '"img>'
    );
  } else if (Elmedia.video) {
    return (
      '<video class="media">' +
      '<source src="' +
      Elmedia.video +
      '" alt="' +
      Elmedia.alt +
      '" type=video/mp4>' +
      '</video> '
    );
  }
}

// Fonction qui affiche soit video ou soit photo en fonction du media json dans la lightbox
function bigMediaLightbox(Elmedia) {
  if (Elmedia.image) {
    return (
      '<img class="media" src="' +
      Elmedia.image +
      '" alt="' +
      Elmedia.alt +
      '"img>' +
      '<h2 class="titre_photo_lightbox">' +
      Elmedia.title +
      '</h2>'
    );
  } else if (Elmedia.video) {
    return (
      '<video autoplay loop class="media">' +
      '<source src="' +
      Elmedia.video +
      '" alt="' +
      Elmedia.alt +
      '" type=video/mp4>' +
      '</video> ' +
      '<h2 class="titre_photo_lightbox">' +
      Elmedia.title +
      '</h2>'
    );
  }
}
//Filtre dropdow

//On écoute au changement de filtre dropdown le choix et on réaffiche les médias en fonction du résultat de popularité, date ou titre
let dropdown = document.querySelector('select');
let containerMedias = document.querySelector('.medias_photographe');
dropdown.addEventListener('change', function (e) {
  e.target.value;

  containerMedias.innerHTML = '';

  if (e.target.value == 'popularite') {
    tableau_medias.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  } else if (e.target.value == 'date') {
    console.log(tableau_medias);
    tableau_medias.sort((a, b) => (a.date > b.date ? 1 : -1));
    console.log(tableau_medias);
  } else if (e.target.value == 'titre') {
    tableau_medias.sort((a, b) => (a.title > b.title ? 1 : -1));
  }
  tableau_medias.forEach((tab) => {
    media_photographe_display(tab);
  });
});
//injection de la bannière total deslikes
let total_likes = document.createElement('span');
total_likes.setAttribute('id', 'likes');
document.querySelector('#likes_price').appendChild(total_likes);
total_likes.innerHTML = '<p id="total_likes">';
'</p>' + '<i class="far fa-heart total"></i>';

//Fonction qui va incrémenter le nombre de likes au clic sur les coeurs
function clickJaime(id) {
  // console.log(id);
  element.forEach((addLike) => {
    //console.log(addLike);
    if (addLike.id == id) {
      addLike.likes += 1;
      document.getElementById(id).innerHTML = addLike.likes;
    }
  });
  totalLikes(element);
}

//fonction qui va faire la somme des likes et s'incrémenter s'il y a un clic sur un coeur
function totalLikes(total) {
  let somme = 0;
  total.forEach((aime) => {
    if (aime.photographerId == idURL) {
      somme += aime.likes;
    }
  });
  document.getElementById('total_likes').innerHTML =
    somme + '<i class="far fa-heart total"></i>';
}
