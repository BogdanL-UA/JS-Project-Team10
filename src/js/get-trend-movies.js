// import { refs } from './refs';
// import axios from 'axios';
// import { trendMovieCardTmpl } from './trend-movie-card-template';

// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = '78817c69ceeb2b190f57a1a13eaf9936';

// const fetchTrendFilms = () => {
//   return fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }

//       return response.json();
//     }
//   );
// };

// let movies = [];
// const renderTrendFilms = () => {
//   const list = movies.map(trendMovieCardTmpl);
//   refs.filmsGallery.innerHTML = '';
//   refs.filmsGallery.insertAdjacentHTML('beforeend', list.join(''));
// };

// fetchTrendFilms().then(({ results }) => {
//   movies = results;
//   renderTrendFilms();
//   renderPagination();
// });

// const refs = {
//   gallery: document.querySelector('.trend-movies__list'),
// }

// export class FetchMoviesApi {
//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//     this.totalPages = 0;
//   }

//   fetchTrendFilms() {

//     return axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${this.page}`).then(r => {
//       this.totalPages = r.data.total_results;
//     return  r.data})} ;

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;

// }
//  incrementPage() {
//   this.page += 1;
// }

// resetPage() {
//   this.page = 1;
// }
//   get pageNumber() { this.page = 1; }

//   set pageNumber(newPage) { this.page = newPage; }

//   get totalPages() { FetchMoviesApi.totalPages; }

//   set totalPages(page) { FetchMoviesApi.totalPages = page; }

// }

// console.log(FetchMoviesApi);

// function createMovieCard(films) {
//   return films.results.map(
//     ({ title, release_date, poster_path, id }) => {

//      release_date = changeYear(release_date);
//       refs.filmsGallery.insertAdjacentHTML(
//         'afterbegin',
//         trendMovieCardTmpl({ title, release_date, poster_path, id }),
//       );
//     },
//   );
// }
// ========= function correct Year================

// function changeYear(release_date) { return release_date.slice(0, 4); }

// export { createMovieCard };
