import './js/key-word-search';
import { refs } from './js/refs';
import { trendMovieCardTmpl } from './js/trend-movie-card-template';
import { fetchTrendFilms } from './js/fetch-movies';

let movies = [];
const render = () => {
  const list = movies.map(trendMovieCardTmpl);
  refs.filmsGallery.innerHTML = '';
  refs.filmsGallery.insertAdjacentHTML('beforeend', list.join(''));
};

fetchTrendFilms().then(({ results }) => {
  movies = results;
  render();
});
