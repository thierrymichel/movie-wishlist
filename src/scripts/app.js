// DEV NOTE: module resolution made possible with `src/webpack.mix.js#40`
import home from 'pages/home';

// #2 IIFE (Immediately Invoked Function Expressions) or Self-invoking functions
(function () {
  // #4 destructuring
  // const namespace = document.body.dataset.namespace;
  const { namespace } = document.body.dataset;

  // DEV NOTE: feature initialization based on namespace
  switch (namespace) {
    case 'home':
      home.init();
      break;
    default:
  }

  // #4 concatenation / template literal
  // console.info('🎥 movie wishlist [' + namespace + ']');
  console.info(`🎥 movie wishlist [${namespace}]`);
}());
