const linkToJson = './photographes.json';
let photographers = [];

fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    photographers = data.photographers;
    if (data.photographers != undefined)
      data.photographers.forEach((Element) => {
        let div = document.createElement('div');
        div.innerHTML =
          '<section class="photographe_description">' +
          '<a class="photographe_link" href="./pagePhotographe.html" id="' +
          Element.id +
          '" aria-label="Mimi Keel">' +
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
          '<li>' +
          '<span class="sr_only">Tag link</span>' +
          '<a class="tag_link" href="#">#' +
          Element.tags[0] +
          '</a>' +
          '</li>' +
          '<li>' +
          '<span class="sr_only">Tag link</span>' +
          '<a class="tag_link" href="#">#' +
          Element.tags[1] +
          '</a>' +
          '</li>' +
          '<li>' +
          '<span class="sr_only">Tag link</span>' +
          '<a class="tag_link" href="#">#' +
          Element.tags[2] +
          '</a>' +
          '</li>' +
          '<li>' +
          '<span class="sr_only">Tag link</span>' +
          '<a class="tag_link" href="#">#' +
          Element.tags[3] +
          '</a>' +
          '</li>' +
          '</ul>' +
          '</section>';

        document.querySelector('#photographe_container').appendChild(div);
      });
  })
  .catch(function (err) {
    console.log('Erreur' + err);
  });

/* <section class="photographe_description">
                <a class="photographe_link" href="./pagePhotographe.html" id="243" aria-label="Mimi Keel">
                    <img class="photographe_portrait" src="./images/PhotographersIDPhotos/MimiKeel.jpg"alt="photo Mimi Keel London UK">
                    <h2 class="photographe_name">Mimi Keel</h2>
                </a>
                <p class="photographe_localisation">London, UK</p>
                <p class="photographe_words">Voir le beau dans le quotidien</p>
                <p class="photographe_price">400€/jour</p>
                <ul class="tag_list filter_mobile">
                    <li>
                        <span class="sr_only">Tag link</span>
                        <a class="tag_link" href="#">#portrait</a>
                    </li>
    
                    <li>
                        <span class="sr_only">Tag link</span>
                        <a class="tag_link" href="#">#events</a>
                    </li>
    
                    <li>
                        <span class="sr_only">Tag link</span>
                        <a class="tag_link" href="#">#travel</a>
                    </li>
    
                    <li>
                        <span class="sr_only">Tag link</span>
                        <a class="tag_link" href="#">#animals</a>
                    </li>
                </ul>
            </section>
}*/

/*idée fonction apparition menu au scroll de la souris
function display_scroll() {
  const bannerScroll = document.querySelector(".header_scroll");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      bannerScroll.style.display = "block";
      bannerScroll.style.opacity = "1";
    } else {
      bannerScroll.style.display = "none";
      bannerScroll.style.opacity = "0";
    }
  });
}
displayScroll();*/
