import renderMovieModal from './renderMovieModal';
import { FilmsApiService } from './apiService';
const filmsApiService = new FilmsApiService();

export default function openMovieModal(e) {
  const movieCardEl = e.target.closest('li');
  const movieId = movieCardEl.dataset.id;

  document.removeEventListener('click', openMovieModal);

  filmsApiService.getFilmsById(movieId).then(renderMovieModal);
}
