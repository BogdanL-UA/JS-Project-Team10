import { renderLibrary } from './render-library';
import { refs } from './library-refs';

const getFromLocalStorage = key =>
  JSON.parse(localStorage.getItem(`${key}Movies`));

let watchedMovies = getFromLocalStorage('watched');
let queueMovies = getFromLocalStorage('queue');

const clearLibraryContainer = () => {
  refs.library.innerHTML = '';
};

const activateWatchedBtn = () => {
  refs.headerWatchedBtn.classList.add('library-header__btn--active');
};
const activateQueueBtn = () => {
  refs.headerQueueBtn.classList.add('library-header__btn--active');
};

const deactivateWatchedBtn = () => {
  refs.headerWatchedBtn.classList.remove('library-header__btn--active');
};

const deactivateQueueBtn = () => {
  refs.headerQueueBtn.classList.remove('library-header__btn--active');
};

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
  return;
} else if (queueMovies.length > 0) {
  //в localstorage є фільми в черзі
  // console.log(queueMovies);
  clearLibraryContainer();
  activateQueueBtn();
  renderLibrary(queueMovies);
  return;
}

//колбеки для кнопок
const onWatchedBtnClick = event => {
  event.preventDefault();

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

//додаємо прослуховувачі подій на кнопки
// refs.headerWatchedBtn.addEventListener('click', onWatchedBtnClick);
