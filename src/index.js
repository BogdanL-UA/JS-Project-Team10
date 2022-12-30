import './js/key-word-search';
import { fetchTrendingMovies } from './js/fetch-trending-movies';
import renderMovieCard from './js/render-movie-card';

fetchTrendingMovies().then(renderMovieCard);
