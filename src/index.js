import './js/key-word-search';
import { fetchTrendingMovies } from './js/fetch-movies';

fetchTrendingMovies().then(data => {
  console.log(data.results);
  return data.results;
});
