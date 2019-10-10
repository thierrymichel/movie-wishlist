const apiKey = '0f6ae00f3058971e60da887e6ef3a010';
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-10-04&sort_by=popularity.desc`;

/**
 * Discover movies
 *
 * @export
 * @returns {Promise<any[]>} array of movies
 */
// #3 Named export
export function discover () {
  return window.fetch(url)
    .then(response => response.json())
    .then(json => json.results);
}
