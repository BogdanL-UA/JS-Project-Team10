import './js/createPageHome';
import './js/pagination';
import './js/key-word-search';
import { fetchTrendingMovies } from './js/fetch-movies';
import './js/team-modal'
fetchTrendingMovies().then(data => {
  console.log(data.results);
  return data.results;
});

import './js/get-trend-movies';
