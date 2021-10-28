const linkToJson = './photographes.json';
let element;

let tableau_medias = [];
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
      // partie du fech pour les informations du photographe à afficher dans la banière à partir du json
      if (data.photographers != undefined)
        data.photographers.forEach((Elphoto) => {
          /* Si l'id contenu dans l'url est la même que celle du photgraphe, afficher banner du photographe */
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
          //lightbox_media(Elmedia);
          //réorganisation de l'affichage des médias en fonction du menu déroulant
          tableau_medias.push(Elmedia);

          //TEST LIGHTBOX
          const bg_lightbox = document.querySelector('.lightbox_container');
          const close_lightbox = document.querySelector('.close_bigger');
          const links = document.querySelectorAll(
            '.media_photographe img, .media_photographe video '
          );
          const display_media = document.querySelectorAll(
            '.lightbox_media_box'
          );

          let medias_lightbox = document.createElement('div');
          medias_lightbox.classList.add('lightbox_media_box');
          document.querySelector('.lightbox').appendChild(medias_lightbox);
          medias_lightbox.innerHTML = bigMediaLightbox(Elmedia);

          // ouverture lighbox en cliquant sur un media
          links.forEach((link) =>
            link.addEventListener('click', function () {
              //console.log(link);
              bg_lightbox.style.display = 'block';
            })
          );
          let mediaActive = 0;
          for (let i = 1; i < display_media.length; i += 1) {
            display_media[i].classList.add('hidden');
          }
          document
            .querySelector('.arrow_right')
            .addEventListener('click', function () {
              display_media[mediaActive].classList.add('hidden');
              mediaActive += 1;
              display_media[mediaActive].classList.remove('hidden');
            });
          // fermeture lightbox au clic sur la croix
          close_lightbox.addEventListener('click', () => {
            bg_lightbox.style.display = 'none';
          });

          /*const display_media = document.querySelectorAll(
            '.media_photographe img, .media_photographe video'
          );
          console.log(display_media);
          let mediaActive = 0;
          for (let i = 1; i < display_media.length; i += 1) {
            display_media[i].classList.add('hidden');
          }
          //clic flèche suivant

          document
            .querySelector('.arrow_right')
            .addEventListener('click', function () {
              display_media[mediaActive].classList.add('.hidden');
              mediaActive += 1;
              display_media[mediaActive].classList.remove('.hidden');
            });*/

          /*<div class="lightbox_media_box">
               <img class="lightbox_media" src="./images/MimiID243/Event_PintoWedding.jpg" alt="Recup via js">
                <h2 class="titre_photo_lightbox">photo test mise en page</h2>
            </div>*/
        }
      });

      //On écoute au changement de filtre dropdown le choix et on réaffiche les médias en fonction du résultat de popularité, date ou titre
      let dropdown = document.querySelector('select');
      dropdown.addEventListener('change', function (e) {
        e.target.value;
        //console.log(e.target.value == 'popularite');
        document.querySelector('.medias_photographe').innerHTML = '';

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

      totalLikes(data.media);
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
      /*'<a aria-label="' +
      Elmedia.alt +
      '" href="' +
      Elmedia.image +
      '">' +*/
      '<img class="media" src="' +
      Elmedia.image +
      '" alt="' +
      Elmedia.alt +
      '"img>' /*+
      '</a>'*/
    );
  } else if (Elmedia.video) {
    return (
      /*'<a aria-label="' +
      Elmedia.alt +
      '" href="' +
      Elmedia.image +
      '">' +*/
      '<video controls class="media">' +
      '<source src="' +
      Elmedia.video +
      '" type=video/mp4>' +
      '</video> ' /*+
      '</a>'*/
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
      '<video controls class="media">' +
      '<source src="' +
      Elmedia.video +
      '" type=video/mp4>' +
      '</video> ' +
      '<h2 class="titre_photo_lightbox">' +
      Elmedia.title +
      '</h2>'
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
