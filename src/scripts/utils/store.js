// Récupérer le localStorage (string) => Array => Set
// ou créer un nouveau Set vide.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const likes = window.localStorage.getItem('likes')
  ? new Set(JSON.parse(window.localStorage.getItem('likes')))
  : new Set();

/**
 * Sauvegarde les likes.
 *
 * @returns {undefined}
 */
function save () {
  // Sauvegarder le Set => Array => localStorage (string)
  window.localStorage.setItem('likes', JSON.stringify([...likes]));
}

/**
 * Ajoute un like.
 *
 * @export
 * @param {Number} id Movie ID
 * @returns {Promise<boolean>} like status
 */
export function add (id) {
  likes.add(id);
  save();
  return Promise.resolve(true);
}

/**
 * Retire un like.
 *
 * @export
 * @param {Number} id Movie ID
 * @returns {Promise<Boolean>} like status
 */
export function remove (id) {
  likes.delete(id);
  save();
  return Promise.resolve(false);
}

/**
 * Vérifie si un film est liké.
 *
 * @export
 * @param {Number} id Movie ID
 * @returns {Boolean} like status
 */
export function check (id) {
  return likes.has(id);
}
