import * as store from 'utils/store';

import anime from 'animejs';

/**
 * Movie like component.
 *
 * @export
 * @class Like
 */
export default class Like {
  /**
   * Creates an instance of Like.
   * @param {HTMLElement} $el DOM element
   * @param {Number} id movie ID
   * @memberof Like
   */
  constructor ($el, id) {
    this.$el = $el;
    this.id = id;

    // On binde le bon contexte à la méthode `toggle`
    // On peut ainsi la passer en simple référence au listener
    // et ainsi la retirer dans la méthode destroy.
    this.toggle = this.toggle.bind(this);

    this.update(store.check(this.id));
    this.init();
  }

  // Minimum lifecycle : init / destroy.
  /**
   * Init component.
   *
   * @memberof Like
   */
  init () {
    this.$el.addEventListener('click', this.toggle);
  }

  /**
   * Destroy component.
   *
   * @memberof Like
   */
  destroy () {
    this.$el.removeEventListener('click', this.toggle);
  }

  /**
   * Toggle, save then update status.
   *
   * @memberof Like
   */
  async toggle () {
    // Si le composant était liké, on retire le like.
    // Sinon, on l'ajoute.
    // Async / await
    // On "taggue" la méthode toggle avec `async`comme contenant du code asynchrone.
    // On peut ainsi utiliser `await` pour attendre le retour de la promesse résolue.
    // À noter que cette promesse nous retourne une valeur (voir `store.js`).
    const status = await (this.isSelected ? store.remove(this.id) : store.add(this.id));

    // On met ensuite le statut à jour selon la réponse du store.
    this.update(status);
  }

  // Variante sans async/await
  toggleVariant () {
    // Selon le statut, on stocke la bonne promesse (add ou remove).
    const p = this.isSelected ? store.remove(this.id) : store.add(this.id);
    // On attend que la promesse soit résolue.
    // Alors, on a accès au status (retour de la promesse).
    p.then(status => {
      this.update(status);
    });
  }

  /**
   * Update statut + UI.
   *
   * @memberof Like
   */
  update (status) {
    // Mise à jour du statut.
    this.isSelected = status;
    // Si liké, flip animation.
    this.isSelected && this.flip();
    // Apparence CSS.
    this.$el.classList.toggle('is-selected', this.isSelected);
  }

  /**
   * Animation "flip".
   *
   * @returns {Promise} Fin de l'animation
   * @memberof Like
   */
  flip () {
    const tween = anime({
      targets: this.$el,
      duration: 500,
      rotateY: '+=180',
      easing: 'easeOutBack'
    });

    return tween.finished;
  }
}
