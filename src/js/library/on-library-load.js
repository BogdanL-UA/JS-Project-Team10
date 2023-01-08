import { renderLibrary } from './render-library';
import { refs } from '../refs';
import { activateWatchedBtn, activateQueueBtn, deactivateWatchedBtn, deactivateQueueBtn } from './library-buttons-functions';
import { clearLibraryContainer } from './clear-container';
import { checkWatched, checkQueue } from './get-from-local-storage';

// let watchedMovies = getFromLocalStorage('watched');
// let queueMovies = getFromLocalStorage('queue');

let watchedMovies = checkWatched();
let queueMovies = checkQueue();

//перевірка local storage при завантаженні сторінки
if (
  (watchedMovies == null || watchedMovies.length === 0) &&
  (queueMovies == null || queueMovies.length === 0)
) {
    //в localstorage нічого немає
    refs.message.innerHTML = '<p>Library is empty</p>';
    refs.library.innerHTML = '';
} else if (watchedMovies.length > 0) {
    //в localstorage є переглянуті фільми (пріоритет)
    activateWatchedBtn();
    renderLibrary(watchedMovies);
} else if (queueMovies.length > 0) {
    //в localstorage є фільми в черзі
    activateQueueBtn();
    renderLibrary(queueMovies);
}

// колбеки
const onWatchedClick = (event) => {

  deactivateQueueBtn();
  activateWatchedBtn();
  clearLibraryContainer();

  // watchedMovies = getFromLocalStorage('watched');
  watchedMovies = checkWatched();

  if (watchedMovies == null || watchedMovies.length === 0) {
    refs.message.innerHTML =
      '<p>List of watches films is empty</p>';
    refs.library.innerHTML = '';
    refs.pagination.style.display = 'none';
  } else if (watchedMovies.length > 0) {
    refs.message.innerHTML = '';
    refs.pagination.style.display = 'flex';
    renderLibrary(watchedMovies);
  }
};

const onQueueClick = (event) => {

  activateQueueBtn();
  deactivateWatchedBtn();
  clearLibraryContainer();

  // queueMovies = getFromLocalStorage('queue');
  queueMovies = checkQueue();

  if (queueMovies == null || queueMovies.length === 0) {
    refs.message.innerHTML =
      '<p>Queue is empty</p>';
    refs.library.innerHTML = '';
    refs.pagination.style.display = 'none';
  } else if (queueMovies.length > 0) {
    refs.message.innerHTML = '';
     refs.pagination.style.display = 'flex';
    renderLibrary(queueMovies);
  }
}


// додаємо прослуховувачі подій на кнопки
refs.headerWatchedBtn.addEventListener('click', onWatchedClick);
refs.headerQueueBtn.addEventListener('click', onQueueClick);
