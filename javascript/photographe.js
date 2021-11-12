const linkToJson = './photographes.json';
let element;
let tableau_medias = [];
let mediaActive = '';

//VARIABLES LIGHTBOX
const bg_lightbox = document.querySelector('.lightbox_container');
const close_lightbox = document.querySelector('.close_bigger');
const lightboxMediaBox = document.querySelector('.lightbox_media_box');
const buttonClose = document.querySelector('.close_modal');
const arrowRight = document.querySelector('.arrow_right');
const arrowLeft = document.querySelector('.arrow_left');

//VARIABLES MODALE
const modalbg = document.querySelector('.background_modal');

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
const regexMessagerie = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

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
      // partie du fech pour les informations des photographes
      if (data.photographers != undefined)
        data.photographers.forEach((Elphoto) => {
          /* Si l'id contenu dans l'url est la même que celle du photographe, afficher données json propre au photographe */
          if (idURL == Elphoto.id) {
            //Affichage de la bannière du photopraphe
            banner_photographe(Elphoto);
            //Affichage bannière pied de page à droite avec total des likes et le tarif journalier du photographe
            totalLikesPriceDay(Elphoto);
            openModale();
            modalePhotographerName(Elphoto);
            closeModale();
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
    })
    .catch(function (err) {
      console.log('Erreur' + err);
    });
});

/* fonction qui va créer le code html de la banniere du photographe */
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
/*fonction de création des tags propres à chaque photographe*/
function createTag(eachTag) {
  let result = '';
  eachTag.forEach((tag) => {
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
  //A chaque tri du select on recharge la page donc on ouvre la lightbox dans la fonction pour que les medias restent
  openLightbox();
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
//Fonction qui va incrémenter le nombre de likes au clic sur les coeurs
function clickJaime(id) {
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

//----------------------FILTRE DROPDOWN-------------------------------

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
function totalLikesPriceDay(likesPrice) {
  //injection de la bannière deslikes totaux
  let total_likes = document.createElement('span');
  total_likes.setAttribute('id', 'likes');
  document.querySelector('#likes_price').appendChild(total_likes);
  total_likes.innerHTML = '<p id="total_likes">';
  '</p>' + '<i class="far fa-heart total"></i>';
  /* Ajout du prix du photographe affiché par jour  */
  let price_day = document.createElement('span');
  price_day.setAttribute('id', 'price_day');
  document.querySelector('#likes_price').appendChild(price_day);
  price_day.innerHTML += `${likesPrice.price}€ / jour`;
}

// ouverture formulaire au clic sur bouton 'contactez-moi'
function openModale() {
  const modalBtn = document.querySelector('.banner_photographe_button');
  modalBtn.addEventListener('click', () => {
    modalbg.style.display = 'block';
  });
}
//Fermeture formulaire au clic sur la croix ou au clavier touche échap
function closeModale() {
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
}
function modalePhotographerName(ownName) {
  //changement du nom de contact en fonction du photographe affiché dans la modale
  let name_banner = document.querySelector('.title-photographe');
  name_banner.innerHTML = ownName.name;
}

//Vérifications entrées formulaire et envoi si tout est ok
function verificationFormField() {
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
      if (prenom.value && nom.value && messagerie.value && message.value) {
        console.log(prenom.value);
        console.log(nom.value);
        console.log(messagerie.value);
        console.log(message.value);
        modalbg.style.display = 'none';
      }
    });
  });
}
verificationFormField();

//--------------------------LIGHTOX-----------------------------------------

// ouverture lighbox en cliquant sur un media et affichage de ce média
function openLightbox() {
  const links = document.querySelectorAll('.media');
  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      mediaActive = index;
      bg_lightbox.style.display = 'block';
      affichageLightbox(tableau_medias[mediaActive]);
    });
  });
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
//On injecte la fonction qui définira si photo ou video à afficher
function affichageLightbox(currentMedia) {
  lightboxMediaBox.innerHTML = bigMediaLightbox(currentMedia);
}
//clic flèche suivant
const displayNext = function () {
  console.log(mediaActive);
  mediaActive++;
  if (mediaActive === tableau_medias.length) {
    mediaActive = 0;
  }
  affichageLightbox(tableau_medias[mediaActive]);
};
arrowRight.addEventListener('click', function () {
  displayNext();
});

//clic flèche précédente
const displayPrevious = function () {
  console.log(mediaActive);
  console.log(tableau_medias.length);
  mediaActive--;
  if (mediaActive < 0) {
    mediaActive = tableau_medias.length - 1;
  }
  affichageLightbox(tableau_medias[mediaActive]);
};
arrowLeft.addEventListener('click', function () {
  displayPrevious();
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
    displayNext();
  }
  if (e.key == 'ArrowLeft') {
    displayPrevious();
  }
  if (e.key == 'Escape') {
    bg_lightbox.style.display = 'none';
  }
});
