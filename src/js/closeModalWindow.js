import { refs } from './refs';
import openMovieModal from './openMovieModal';

export default function closeModalWindow() {
  refs.backdrop.classList.add('visually-hidden');
  refs.movieModal.innerHTML = '';
  document.addEventListener('click', openMovieModal);
}
