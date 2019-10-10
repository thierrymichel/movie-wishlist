// #3 default import
import createItem from 'components/item';

/**
 * Create / update a list
 *
 * @export
 * @param {HTMLUListElement} $list list element
 * @param {any[]} items items data
 * @returns {undefined}
 */
// #3 default export
export default function create ($list, items) {
  // Boucler sur les données
  items.forEach(item => {
    // Créer un élément
    const $item = createItem(item);

    // Ajouter à la liste
    $list.appendChild($item);
  });
}
