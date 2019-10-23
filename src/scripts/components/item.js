import { TimelineLite, Power4 } from 'gsap/TweenMax';
import SplitText from 'vendor/SplitText';

/**
 * Item template
 *
 * @param {*} title title
 * @param {*} imgSrc image source
 * @returns {HTMLLIElement} list item element
 */
function template (title, imgSrc) {
  const $tpl = document.createElement('template');

  // Créer un <li>
  // Ajouter un titre
  // Ajouter image
  const str = `<li class="item">
        <h2 class="item__title">${title}</h2>
        <img class="item__poster"
             src="${imgSrc}"
             alt="…"
        >
      </li>`;

  $tpl.innerHTML = str;

  return $tpl.content.firstChild;
}

/**
 * Create a movie element
 *
 * @export
 * @param {any} data movie data
 * @returns {any} movie element
 */
// #3 default export
export default function create (data) {
  // destructuring
  const { title, poster_path: imgFileName } = data;
  const imgSrc = `https://image.tmdb.org/t/p/w500${imgFileName}`;

  // Récupération et stockage des éléments à animer
  const $el = template(title, imgSrc);
  const $title = $el.querySelector('.item__title');
  const $poster = $el.querySelector('.item__poster');

  // Création d'une timeline
  const tl = new TimelineLite({
    paused: true
  });
  // Split du titre (mots et lettres)
  const split = new SplitText($title, {
    type: 'chars,words'
  });

  tl
    // Ajout d'un tween pour le poster
    .from($poster, 1.5, {
      width: 0,
      ease: Power4.easeOut,
      clearProps: 'all'
    })
    // Ajout d'une étiquette pour synchroniser l'animation du titre
    .addLabel('title', '-=1')
    // Tween du bloc
    .from($title, 1, {
      yPercent: 100,
      ease: Power4.easeOut
    }, 'title')
    // Tween des mots (en séquence étalée)
    .staggerFrom(split.words, 0.5, {
      opacity: 0,
      yPercent: 50
    }, 0.1, 'title');

  // On retourne notr eobjet avec une propriété et une méthode
  return {
    // WET…
    // $el: $el,
    // DRY…
    $el,
    show (delay = 0) {
      // classList
      // TweenMax
      tl.delay(delay);
      tl.play();
    }
  };
}
