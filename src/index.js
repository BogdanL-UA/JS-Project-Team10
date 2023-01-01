import './js/gallery';
import './js/pagination';
import './js/key-word-search';
import './js/get-trend-movies';
import { fetchTrendingMovies } from './js/fetch-trending-movies';
import renderMovieCard from './js/render-movie-card';

fetchTrendingMovies().then(renderMovieCard);

