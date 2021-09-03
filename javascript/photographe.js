const linkToJson = './photographes.json';

let medias = [];

let params = new URL(document.location).searchParams;
let idURL = params.get('id');

fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    if (data.photographers != undefined)
      data.photographers.forEach((Elphoto) => {
        /* Si l'id contenu dans l'url est la même que celle du photgraphe, afficher banner du photographe */
        if (idURL == Elphoto.id) {
          banner_photographe(Elphoto);
        }
      });

    medias = data.media;
    if (data.media != undefined)
      data.media.forEach((Elmedia) => {
        //if (l'id de photographer === au photographeID du media)
        if (idURL == Elmedia.photographerId) {
          let media_photographe = document.createElement('div');
          media_photographe.classList.add('media_photographe');
          document
            .querySelector('.medias_photographe')
            .appendChild(media_photographe);
          media_photographe.innerHTML =
            '<img class="media" src="' +
            Elmedia.image +
            '" alt="' +
            Elmedia.alt +
            '">' +
            '<div class="media_texte">' +
            '<p class="media_title">' +
            Elmedia.title +
            '</p>' +
            '<div class="media_heart" aria-label="likes">' +
            '<p class="nb_likes">' +
            Elmedia.likes +
            '</p>' +
            '<div class="coeur">' +
            '<i class="far fa-heart"></i>' +
            '</div>' +
            '</div>' +
            '</div>';
        }
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
      '<a class="tag_link photographe_page" href="#">#' +
      tag +
      '</a>' +
      '</li>';
  });
  return result;
}

/* fonction que va créer le code html de la banner du photogrpahe */
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

/*let banner_photographe = document.createElement('div');
banner_photographe.classList.add('banner_photographe_description');
document
  .querySelector('.banner_photographe_container')
  .appendChild(banner_photographe);
banner_photographe.innerHTML =
  '<h1 class="banner_photographe_nom">Mimi Keel</h1>' +
  '<p class="banner_photographe_localisation">London, UK</p>' +
  '<p class="banner_photographe_words">Voir le beau dans le quotidien</p>' +
  '<ul class="banner_photographe_filter">' +
  '<li>' +
  '<span class="sr_only">Tag link</span>' +
  '<a class="tag_link photographe_page" href="#">#portrait</a>' +
  '</li>' +
  '<li>' +
  '<span class="sr_only">Tag link</span>' +
  '<a class="tag_link photographe_page" href="#">#events</a>' +
  '</li>' +
  '<li>' +
  '<span class="sr_only">Tag link</span>' +
  '<a class="tag_link photographe_page" href="#">#travel</a>' +
  '</li>' +
  '<li>' +
  '<span class="sr_only">Tag link</span>' +
  '<a class="tag_link photographe_page" href="#">#animals</a>' +
  '</li>' +
  '</ul>' +
  '</div>';

let banner_button = document.createElement('button');
banner_button.classList.add('banner_photographe_button');
banner_button.setAttribute('aria-label', 'Contact Me');
banner_button.innerHTML = 'Contactez-moi';
document
  .querySelector('.banner_photographe_container')
  .appendChild(banner_button);

let banner_img = document.createElement('div');
banner_img.classList.add('banner_photographe_img_container');
document.querySelector('.banner_photographe_container').appendChild(banner_img);
banner_img.innerHTML +=
  '<img class="banner_photographe_img" src="./images/PhotographersIDPhotos/MimiKeel.jpg" alt="Mimi Keel">';

/* 
     <div class="banner_photographe_description">
                <h1 class="banner_photographe_nom">Mimi Keel</h1>
                <p class="banner_photographe_localisation">London, UK</p>
                <p class="banner_photographe_words">Voir le beau dans le quotidien</p>
                <ul class="banner_photographe_filter">
                    <li>
                        <span class="sr_only">Tag link</span>
                        <a class="tag_link photographe_page" href="#">#portrait</a>
                    </li>
    
                    <li>
                        <span class="sr_only">Tag link</span>
                        <a class="tag_link photographe_page" href="#">#events</a>
                    </li>
    
                    <li>
                        <span class="sr_only">Tag link</span>
                        <a class="tag_link photographe_page" href="#">#travel</a>
                    </li>
    
                    <li>
                        <span class="sr_only">Tag link</span>
                        <a class="tag_link photographe_page" href="#">#animals</a>
                    </li>
                </ul>
            </div>
            <button class="banner_photographe_button" aria-label="Contact Me">Contactez-moi
            </button>
            <div class="banner_photographe_img_container">
                <img class="banner_photographe_img" src="./images/PhotographersIDPhotos/MimiKeel.jpg" alt="Mimi Keel">
            </div>-->


            
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

            <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Event_BenevidesWedding.jpg" alt="Benevides Wedding">
                <div class="media_texte">
                    <p class="media_title">Benevides Wedding</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">77</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Event_PintoWedding.jpg" alt="Pinto Wedding">
                <div class="media_texte">
                    <p class="media_title">Pinto Wedding</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">52</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Event_SeasideWedding.jpg" alt="Seaside Wedding">
                <div class="media_texte">
                    <p class="media_title">Seaside Wedding</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">25</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Portrait_Background.jpg" alt="Portrait Background">
                <div class="media_texte">
                    <p class="media_title">Portrait Background</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">45</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Portrait_Nora.jpg" alt="Portrait Nora">
                <div class="media_texte">
                    <p class="media_title">Portrait Nora</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">63</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Portrait_Wednesday.jpg" alt="Portrait Wednesday">
                <div class="media_texte">
                    <p class="media_title">Portrait Wednesday</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">34</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Travel_HillsideColor.jpg" alt="Hillside Color">
                <div class="media_texte">
                    <p class="media_title">Hillside Color</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">85</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="media_photographe">
                <img class="media" src="./images/MimiID243/Travel_Lonesome.jpg" alt="Lonesome">
                <div class="media_texte">
                    <p class="media_title">Lonesome</p>
                    <div class="media_heart" aria-label="likes">
                        <p class="nb_likes">88</p>
                        <div class="coeur">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

/*idée Compteur likes*

function incrementLikes() {
  let i = document.querySelector('.nb_likes');
  i.value = Number(i.value) + 1;
}

let b = document.querySelector('.fa-heart');
b.addEventListener('click', incrementLikes);

let clickLikes = Element.likes;
        document
          .querySelector('.coeur')
          .addEventListener('click', function (e) {
            e.preventDefault;
            e.stopPropagation;

            document.querySelector('nb_likes').innerHTML = ++clickLikes + '';
          });*/
