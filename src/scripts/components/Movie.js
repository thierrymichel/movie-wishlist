import Like from 'components/Like';

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
        <button type="button" class="item__like like">
          <svg>
            <use href="#heart" />
          </svg>
        </button>
      </li>`;

  $tpl.innerHTML = str;

  return $tpl.content.firstChild;
}

/**
 * Movie item component.
 *
 * @export
 * @class Movie
 */
export default class Movie {
  /**
   * Creates an instance of Movie.
   * @param {any} data movie data (from API)
   * @memberof Movie
   */
  constructor (data) {
    // destructuring
    const { title, poster_path: imgFileName, id } = data;
    const imgSrc = `https://image.tmdb.org/t/p/w500${imgFileName}`;

    // Récupération et stockage des éléments à animer
    this.$el = template(title, imgSrc);
    this.$title = this.$el.querySelector('.item__title');
    this.$poster = this.$el.querySelector('.item__poster');
    this.$like = this.$el.querySelector('.item__like');
    // Création du like
    this.like = new Like(this.$like, id);

    this.init();
  }

  /**
   * Init hook.
   *
   * @memberof Movie
   */
  init () {
    // Création d'une timeline
    this.tl = new TimelineLite({
      paused: true
    });
    // Split du titre (mots et lettres)
    const split = new SplitText(this.$title, {
      type: 'chars,words'
    });

    this.tl
      // Ajout d'un tween pour le poster
      .from(this.$poster, 1.5, {
        width: 0,
        ease: Power4.easeOut,
        clearProps: 'all'
      })
      // Ajout d'une étiquette pour synchroniser l'animation du titre
      .addLabel('title', '-=1')
      // Tween du bloc
      .from(this.$title, 1, {
        yPercent: 100,
        ease: Power4.easeOut
      }, 'title')
      // Tween des mots (en séquence étalée)
      .staggerFrom(split.words, 0.5, {
        opacity: 0,
        yPercent: 50
      }, 0.1, 'title')
      .fromTo(this.$like, 0.25, {
        opacity: 0
      }, {
        opacity: 0.65,
        clearProps: 'opacity'
      }, '-=0.2');
  }

  /**
   * Show movie transition.
   *
   * @param {number} [delay=0] transition delay
   * @memberof Movie
   */
  show (delay = 0) {
    this.tl.delay(delay);
    this.tl.play();
  }
}
