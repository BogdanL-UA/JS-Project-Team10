import renderMovieModal from './renderMovieModal';
import { refs } from './refs';
import { FilmsApiService } from './apiService';
const filmsApiService = new FilmsApiService();

export default function openMovieModal(e) {
  document.removeEventListener('click', openMovieModal);
  const movieCardEl = e.target.closest('li');

  const movieId = movieCardEl.dataset.id;

  filmsApiService.getFilmsById(movieId).then(renderMovieModal);
}
