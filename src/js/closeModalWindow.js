import { refs } from './refs';
import openMovieModal from './openMovieModal';
import { enableBodyScroll } from './scrollBlocker';

export default function closeModalWindow() {
  refs.backdrop.classList.add('visually-hidden');
  enableBodyScroll(refs.backdrop);
  refs.movieModal.innerHTML = '';
  document.addEventListener('click', openMovieModal);
}
