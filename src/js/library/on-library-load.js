import { renderLibrary } from './render-library';
import { refs } from './library-refs';
import { activateWatchedBtn, activateQueueBtn, deactivateWatchedBtn, deactivateQueueBtn } from './library-buttons-functions';
import { clearLibraryContainer } from './clear-containers';

const getFromLocalStorage = key =>
  JSON.parse(localStorage.getItem(`${key}Movies`));

let watchedMovies = getFromLocalStorage('watched');
let queueMovies = getFromLocalStorage('queue');


//перевірка localstorage при завантаженні сторінки
if (
  (watchedMovies == null || watchedMovies.length === 0) &&
  (queueMovies == null || queueMovies.length === 0)
) {
  //в localstorage нічого немає
  clearLibraryContainer();
  refs.message.innerHTML = '<p>Ви ще не додали фільми до бібліотеки</p>';
} else if (watchedMovies.length > 0) {
  //в localstorage є переглянуті фільми (пріоритет)
  // console.log(watchedMovies);
  clearLibraryContainer();
  activateWatchedBtn();
  renderLibrary(watchedMovies);
} else if (queueMovies.length > 0) {
  //в localstorage є фільми в черзі
  // console.log(queueMovies);
  clearLibraryContainer();
  activateQueueBtn();
  renderLibrary(queueMovies);
}

const onWatchedClick = (event) => {

  console.log('Привіт від кнопки watched');

  deactivateQueueBtn();
  activateWatchedBtn();

  clearLibraryContainer();

  if (watchedMovies == null || watchedMovies.length === 0) {
    refs.message.innerHTML =
      '<p>Ви ще не додали фільми до списку переглянутих</p>';
  } else if (watchedMovies.length > 0) {
    refs.message.innerHTML = '';
    renderLibrary(watchedMovies);
  }
};

const onQueueClick = (event) => {
    console.log('Привіт від кнопки queue');

  activateQueueBtn();
  deactivateWatchedBtn();

  clearLibraryContainer();

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
