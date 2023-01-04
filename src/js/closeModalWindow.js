import { refs } from './refs';
import openMovieModal from './openMovieModal';
import { enableBodyScroll } from './scrollBlocker';

export default function closeModalWindow() {
  refs.backdrop.classList.add('visually-hidden');
  enableBodyScroll(refs.movieModal);
  refs.movieModal.innerHTML = '';
  document.addEventListener('click', openMovieModal);
}




export default function closeMovieModalWindow() {
  refs.backdrop.classList.add('visually-hidden');
  refs.movieModal.innerHTML = '';
  document.addEventListener('click', openMovieModal);
  }


refs.backdrop.addEventListener('click', onBackdropClick)
function onBackdropClick(event) {
if (event.currentTarget === event.target) {
  closeMovieModalWindow();
}
}


  window.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      closeMovieModalWindow()
    }
  });