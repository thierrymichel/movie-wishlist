// #3 default import
import Movie from 'components/Movie';

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
  items.forEach((data, i) => {
    // Créer un élément
    // Notre 'item' est un objet avec :
    // une propriété `$el` contenant l'élément list-item
    // une méthode `show` permettant de l'afficher avec une transition
    const item = new Movie(data);

    // Ajouter à la liste
    $list.appendChild(item.$el);

    item.show(i * 0.15);
  });
}
