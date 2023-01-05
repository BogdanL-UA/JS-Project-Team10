import { renderLibrary } from './render-library';
import { refs } from '../refs';
import { activateWatchedBtn, activateQueueBtn, deactivateWatchedBtn, deactivateQueueBtn } from './library-buttons-functions';
import { clearLibraryContainer } from './clear-container';
import { getFromLocalStorage } from './get-from-local-storage' ;

let watchedMovies = getFromLocalStorage('watched');
let queueMovies = getFromLocalStorage('queue');

//перевірка local storage при завантаженні сторінки
if (
  (watchedMovies == null || watchedMovies.length === 0) &&
  (queueMovies == null || queueMovies.length === 0)
) {
  //в localstorage нічого немає
  refs.message.innerHTML = '<p>Ви ще не додали фільми до бібліотеки</p>';
} else if (watchedMovies.length > 0) {
  //в localstorage є переглянуті фільми (пріоритет)
  activateWatchedBtn();
  renderLibrary(watchedMovies);
} else if (queueMovies.length > 0) {
  //в localstorage є фільми в черзі
  activateQueueBtn();
  renderLibrary(queueMovies);
}

const onWatchedClick = (event) => {

  deactivateQueueBtn();
  activateWatchedBtn();
  clearLibraryContainer();

  watchedMovies = getFromLocalStorage('watched');

  if (watchedMovies == null || watchedMovies.length === 0) {
    refs.message.innerHTML =
      '<p>Ви ще не додали фільми до списку переглянутих</p>';
  } else if (watchedMovies.length > 0) {
    refs.message.innerHTML = '';
    renderLibrary(watchedMovies);
  }
};

const onQueueClick = (event) => {

  activateQueueBtn();
  deactivateWatchedBtn();
  clearLibraryContainer();

  queueMovies = getFromLocalStorage('queue');

  if (queueMovies == null || queueMovies.length === 0) {
    refs.message.innerHTML =
      '<p>Ви ще не додали фільми до черги</p>';
  } else if (queueMovies.length > 0) {
    refs.message.innerHTML = '';
    renderLibrary(queueMovies);
  }
}

// додаємо прослуховувачі подій на кнопки
refs.headerWatchedBtn.addEventListener('click', onWatchedClick);
refs.headerQueueBtn.addEventListener('click', onQueueClick);
