// import { refs } from './refs';
import { pagination } from './pagination';
import { createMovieCard } from './get-trend-movies';
import { FilmsApiService } from './api-service';

import Pagination from 'tui-pagination';

const filmsApiService = new FilmsApiService();

window.addEventListener('load', uploadTrendMovies);

//  async function uploadTrendMovies() {
   function uploadTrendMovies() {
   filmsApiService.fetchTrendFilms().then(films => {
    createMovieCard(films);
  });
  pagination();
}
