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
 * @returns {HTMLElement} movie element
 */
// #3 default export
export default function create (data) {
  // destructuring
  const { title, poster_path: imgFileName } = data;
  const imgSrc = `https://image.tmdb.org/t/p/w500${imgFileName}`;

  return template(title, imgSrc);
}
