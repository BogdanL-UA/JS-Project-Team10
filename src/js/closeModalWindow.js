import { refs } from './refs';
import openMovieModal from './openMovieModal';
import { enableBodyScroll } from './scrollBlocker';

export default function closeMovieModalWindow() {
  refs.backdrop.classList.add('visually-hidden');
  refs.movieModal.innerHTML = '';
  document.addEventListener('click', openMovieModal);
  window.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      closeModalWindow()
    }});
  }



export default function closeModalWindow() {
  refs.backdrop.classList.add('visually-hidden');
  enableBodyScroll(refs.movieModal);
  refs.movieModal.innerHTML = '';
  document.addEventListener('click', openMovieModal);
}
