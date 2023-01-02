import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';
import { FilmsApiService } from './apiService';
import { createMovieCard } from './get-trend-movies';
import { createGallery2 } from './createSearchGallery';

 

const filmsApiService = new FilmsApiService();


function pagination() {
  filmsApiService.page = 1;
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
    filmsApiService.page = eventData.page;
    filmsApiService.fetchTrendFilms().then(films => {
      refs.filmsGallery.innerHTML = '';
      createMovieCard(films);
    });
  });
}
export { pagination };

  function paginationOnQuery() {
  filmsApiService.page = 1;
  const options = {
    totalItems: FilmsApiService.totalPages,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination = new Pagination(refs.pagination, options);
  pagination.reset();
  pagination.on('beforeMove', function (eventData) {
    filmsApiService.page = eventData.page;
    filmsApiService.getFilmsByQuery().then(films => {
      refs.filmsGallery.innerHTML = '';
      createGallery2(film);
    });
  });
}
export { paginationOnQuery };