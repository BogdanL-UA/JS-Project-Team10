import { FilmsApiService } from './apiService';

const filmsApiService = new FilmsApiService();

let movieId = [];

async function searchGenres() {
  const filmGenres = await filmsApiService.fetchGenres();
  return (movieId = filmGenres);
}

export { searchGenres, movieId };
