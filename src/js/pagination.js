
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';

import { FetchMoviesApi } from './get-trend-movies';
import { createMovieCard } from './get-trend-movies';
const fetchMoviesApi = new FetchMoviesApi();

// const refs = {
//     pagination: document.getElementById('pagination'),
//     gallery: document.querySelector('.trend-movies__list'),

// }

function pagination() {
  fetchMoviesApi.page = 1;
  const options = {
    totalItems: 20000,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination = new Pagination(refs.pagination, options);
  pagination.reset();
  pagination.on('beforeMove', function (eventData) {
    fetchMoviesApi.page = eventData.page;
    fetchMoviesApi.fetchTrendFilms().then(films => {
      refs.filmsGallery.innerHTML = '';
      createMovieCard(films);
    });
  });
}
export { pagination };