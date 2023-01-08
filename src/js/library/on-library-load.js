import { renderLibrary } from './render-library';
import { refs } from '../refs';
import {
  activateWatchedBtn,
  activateQueueBtn,
  deactivateWatchedBtn,
  deactivateQueueBtn,
} from './library-buttons-functions';
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
  refs.message.innerHTML =
    '<p class="message__text">Library is empty</p><image width="300" src="https://thumbs.gfycat.com/AccurateUnfinishedBergerpicard-size_restricted.gif"/>';
  refs.library.innerHTML = '';
  refs.pagination.style.display = 'none';
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
const onWatchedClick = event => {
  deactivateQueueBtn();
  activateWatchedBtn();
  clearLibraryContainer();

  // watchedMovies = getFromLocalStorage('watched');
  watchedMovies = checkWatched();

  if (watchedMovies == null || watchedMovies.length === 0) {
    refs.message.innerHTML = `<p class="message__text">List of watched films is empty</p><image width="300" 
  src="https://thumbs.gfycat.com/AccurateUnfinishedBergerpicard-size_restricted.gif"
  />`;
    refs.library.innerHTML = '';
    refs.pagination.style.display = 'none';
  } else if (watchedMovies.length > 0) {
    refs.message.innerHTML = '';
    refs.pagination.style.display = 'flex';
    renderLibrary(watchedMovies);
  }
};

const onQueueClick = event => {
  activateQueueBtn();
  deactivateWatchedBtn();
  clearLibraryContainer();

  // queueMovies = getFromLocalStorage('queue');
  queueMovies = checkQueue();

  if (queueMovies == null || queueMovies.length === 0) {
    refs.message.innerHTML =

      '<p class="message__text">Queue is empty</p><image width="300" src="https://thumbs.gfycat.com/AccurateUnfinishedBergerpicard-size_restricted.gif"/>';
    refs.library.innerHTML = '';
    refs.pagination.style.display = 'none';
  } else if (queueMovies.length > 0) {
    refs.message.innerHTML = '';
    refs.pagination.style.display = 'flex';
    renderLibrary(queueMovies);
  }
};

// додаємо прослуховувачі подій на кнопки
refs.headerWatchedBtn.addEventListener('click', onWatchedClick);
refs.headerQueueBtn.addEventListener('click', onQueueClick);
