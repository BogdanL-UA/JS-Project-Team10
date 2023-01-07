// import { refs } from './refs';
import { pagination } from './pagination';
// import { showPagination } from './pagination';
import { createMovieCard } from './get-trend-movies';
import { FilmsApiService } from './api-service';
import Loading from './spinner';

import Pagination from 'tui-pagination';

const filmsApiService = new FilmsApiService();

window.addEventListener('load', uploadTrendMovies);

//  async function uploadTrendMovies() {
function uploadTrendMovies() {
  // showPagination();
  filmsApiService
    .fetchTrendFilms()
    .then(films => {
      Loading.pulse('Loading...', {
        svgColor: '#FF6B08',
      });
      createMovieCard(films);
      //  showPagination();
    })
    .finally(() => Loading.remove());
  pagination();
}
