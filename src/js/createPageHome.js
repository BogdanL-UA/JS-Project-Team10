import { createMovieCard } from './get-trend-movies';
import { FilmsApiService } from './apiService';
import { pagination } from './pagination';


const filmsApiService = new FilmsApiService();

window.addEventListener('load', uploadTrendMovies);

async function uploadTrendMovies() {

  await filmsApiService.fetchTrendFilms().then(films => {
      createMovieCard(films);

  });
  pagination();

}
