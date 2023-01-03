import { refs } from './refs';
import openMovieModal from './openMovieModal';
import { enableBodyScroll } from './scrollBlocker';

function closeModalWindow() {
  refs.backdrop.classList.add('visually-hidden');
  refs.movieModal.innerHTML = '';
  document.addEventListener('click', openMovieModal);
  window.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      closeModalWindow()
    }
  });


function closeModalWindow() {
  refs.backdrop.classList.add('visually-hidden');
  enableBodyScroll(refs.backdrop);
  refs.movieModal.innerHTML = '';
  document.addEventListener('click', openMovieModal);
}
export { closeModalWindow, closeModalWindow };