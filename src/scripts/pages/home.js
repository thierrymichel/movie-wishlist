// #3 Import named exports explicitly
// import { discover } from './api';
// #3 OR import all named as …
import * as api from 'utils/api';
import createListing from 'components/listing';

export default {
  /**
   * Init homepage
   *
   */
  init () {
    // Fetch mode
    api
      .discover()
      .then(data => {
        createListing(document.querySelector('.listing'), data);
      });
  }
};
