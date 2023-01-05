import { refs } from './refs';
import closeMovieModalWindow from './close-modal-window';
import createGenresMarkup from './create-genres-markup';
import { disableBodyScroll } from './scroll-blocker';

export default function renderMovieModal({
  id,
  poster_path,
  title,
  vote_count,
  vote_average,
  popularity,
  original_title,
  genres,
  overview,
}) {
  const voteNumeric = String(vote_average).slice(0, 3);
  const popularityNumeric = popularity.toFixed(1);
  const movieGenresMarkup = getMovieGenresArr(genres);

  const movieModalMarkup = `<div class="movie__template" data-id=${id}><div class="trailer__target visually-hidden"></div>
      <div class="movie__img-wrapper"
        ><img class="movie__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movie" 
      /><div class="trailer__button"><button class="trailer__play">Play
          </button></div></div>
          
      <div class="movie__wrapper">
      <h2 class="movie__header">${title}</h2>
      <div class="movie__grid">
        <div class="movie__row">
          <p class="movie__info">Vote / Votes</p>
          <p class="movie__info-value">
            <span class="movie__rating">${voteNumeric}</span> / ${vote_count}
          </p>
        </div>
        <div class="movie__row">
          <p class="movie__info">Popularity</p>
          <p class="movie__info-value">${popularityNumeric}</p>
        </div>
        <div class="movie__row">
          <p class="movie__info">Original Title</p>
          <p class="movie__info-value">${original_title}</p>
        </div>
          <div class="movie__row">
            <p class="movie__info">Genre</p>
            <p class="movie__info-value">${movieGenresMarkup}</p>
          </div>
        </div>
        <div class="movie__about-container">
        <h3 class="movie__header-about">ABOUT</h3>
        <p class="movie__about">${overview}</p></div>
        <span class="movie__buttons-wrapper"
          ><button class="movie__watched button--modal">add to Watched</button>
          <button class="movie__queue button--modal">add to queue</button></span
        ></div>
        </div>`;
  refs.movieModal.insertAdjacentHTML('afterbegin', movieModalMarkup);
  refs.backdrop.classList.remove('visually-hidden');
  refs.closeModalIcon.addEventListener('click', closeMovieModalWindow);
  disableBodyScroll(refs.movieModal);

  const btnWatchedFilms = document.querySelector('.movie__watched');
  let watchedFilms = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  const isWatched = watchedFilms.includes(id);
  if (isWatched) {
    btnWatchedFilms.innerText = 'Remove from watched';
  } else {
    btnWatchedFilms.innerText = 'Add to watched';
  }
  btnWatchedFilms.addEventListener('click', onWatched);

  function onWatched(e) {
    let watchedFilms = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const item = document.querySelector(`.library__item[data-id="${id}"]`); //костиль
    const isWatched = watchedFilms.includes(id);
    if (!isWatched) {
      watchedFilms.push(id);
      e.target.innerText = 'Remove from watched';

      item === null ? 'continue' : item.classList.remove('disable');
    } else {
      const movieIdIndex = watchedFilms.indexOf(id);
      watchedFilms.splice(movieIdIndex, 1);
      e.target.innerText = 'Add to watched';

      item === null ? 'continue' : item.classList.add('disable');
    }
    localStorage.setItem('watchedMovies', JSON.stringify(watchedFilms));
  }

  const btnQueueFilms = document.querySelector('.movie__queue');
  let queueFilms = JSON.parse(localStorage.getItem('queueMovies')) || [];
  const isQueue = queueFilms.includes(id);
  if (isQueue) {
    btnQueueFilms.innerText = 'Remove from queue';
  } else {
    btnQueueFilms.innerText = 'Add to queue';
  }
  btnQueueFilms.addEventListener('click', onQueue);

  function onQueue(e) {
    let queueFilms = JSON.parse(localStorage.getItem('queueMovies')) || [];
    const item = document.querySelector(`.library__item[data-id="${id}"]`); //костиль
    const isQueue = queueFilms.includes(id);

    if (!isQueue) {
      queueFilms.push(id);
      e.target.innerText = 'Remove from queue';
      item === null ? 'continue' : item.classList.remove('disable');
    } else {
      const movieQueueIdIndex = queueFilms.indexOf(id);
      queueFilms.splice(movieQueueIdIndex, 1);
      e.target.innerText = 'Add to queue';

      item === null ? 'continue' : item.classList.add('disable');
    }
    localStorage.setItem('queueMovies', JSON.stringify(queueFilms));
  }
}

function getMovieGenresArr(genres) {
  const movieGenresArr = [];
  for (const genre of genres) {
    movieGenresArr.push(genre.id);
  }

  const genreMarkup = createGenresMarkup(movieGenresArr);
  return genreMarkup[0];
}
