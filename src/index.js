import { fetchTrendingMovies } from './fetch-movies';

fetchTrendingMovies().then(data => {
  console.log(data.results);
  return data.results;
});
