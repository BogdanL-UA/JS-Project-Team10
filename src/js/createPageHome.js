import { refs } from './refs';
import { pagination } from './pagination';
import { createMovieCard } from './get-trend-movies';
import { FilmsApiService } from './apiService';

// import Pagination from 'tui-pagination';

const filmsApiService = new FilmsApiService();

// window.addEventListener('load', uploadTrendMovies);

export async function uploadTrendMovies() {
  await filmsApiService.fetchTrendFilms().then(films => {
    createMovieCard(films);
  });
  pagination();
}
