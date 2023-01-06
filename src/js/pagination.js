import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';
import { FilmsApiService } from './api-service';
import { createMovieCard } from './get-trend-movies';
import { createGallery } from './create-search-gallery';

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
   if (window.innerWidth <= 480) {
    options.visiblePages = 3;
  } else {
    options.visiblePages = 5;
  }

  const pagination = new Pagination(refs.pagination, options);
  pagination.reset();
  pagination.on('beforeMove', function (eventData) {
    refs.gallery.innerHTML = '';
  });
  pagination.on('afterMove', function (eventData) {
    filmsApiService.page = eventData.page;
    filmsApiService.fetchTrendFilms().then(films => {
      
      createMovieCard(films);
    });
  });
}

  
    function paginationOnQuery() {
  const options = {
    totalItems: FilmsApiService.totalPages,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination = new Pagination(refs.pagination, options);
  // pagination.reset();
   pagination.on('beforeMove', function (eventData) {
    filmsApiService.page = eventData.page;
    filmsApiService.getFilmsByQuery().then(films => {
      // filmsApiService.page = 1;
      refs.gallery.innerHTML = '';
      // const markup = createGallery(films.results);
      createGallery(films.results);
      // refs.gallery.innerHTML = createGallery(films.results);
    });
  });
    }
   

   export { pagination, paginationOnQuery };

