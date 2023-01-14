import { refs } from './refs';
import closeMovieModalWindow from './close-modal-window';
import createGenresMarkup from './create-genres-markup';
import { disableBodyScroll } from './scroll-blocker';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
// import {
//   setWatchedFilm,
//   getWatchedFilms,
//   removeWatchedFilm,
//   removeQueuedFilm,
//   getQueuedFilms,
//   setQueuedFilm,

// } from './authorisation';
import {
  getDatabase,
  set,
  ref,
  update,
  push,
  onValue,
} from 'firebase/database';
const firebaseConfig = {
  apiKey: 'AIzaSyANvf5DboogtJf9gd318qK6ilPZ01xrlU8',
  authDomain: 'js-project-team10.firebaseapp.com',
  projectId: 'js-project-team10',
  storageBucket: 'js-project-team10.appspot.com',
  messagingSenderId: '385026279680',
  appId: '1:385026279680:web:184d90dda8d043ce558be5',
  measurementId: 'G-TVCY6RM8XF',
  databaseURL:
    'https://js-project-team10-default-rtdb.europe-west1.firebasedatabase.app/',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
let filmsInQueue = localStorage.getItem('queueMovies');
let filmsInWatched = localStorage.getItem('watchedMovies');
let userUid = localStorage.getItem('uid');
function setQueuedFilm(filmId) {
  getQueuedFilms();
  let queuedFilms = JSON.parse(filmsInQueue);

  queuedFilms.push(filmId);
  let strQueuedFilms = JSON.stringify(queuedFilms);

  const newQueuedFilmRef = ref(database, 'users/' + userUid);
  update(newQueuedFilmRef, {
    queuedFilms: strQueuedFilms,
  }).catch(error => {
    console.log(error);
  });
}

export function getQueuedFilms() {
  const queuedFilmsListRef = ref(database, 'users/' + userUid);
  onValue(queuedFilmsListRef, snapshot => {
    const data = snapshot.val();
    filmsInQueue = data.queuedFilms;
    localStorage.setItem('queueMovies', filmsInQueue);
  });
}

function removeQueuedFilm(filmId) {
  getQueuedFilms();
  let queuedFilms = JSON.parse(filmsInQueue);
  queuedFilms.splice(queuedFilms.indexOf(filmId), 1);
  let strQueuedFilms = JSON.stringify(queuedFilms);
  const newQueuedFilmRef = ref(database, 'users/' + userUid);
  update(newQueuedFilmRef, {
    queuedFilms: strQueuedFilms,
  }).catch(error => {
    console.log(error);
  });
}
function setWatchedFilm(filmId) {
  getWatchedFilms();
  let watchedFilms = JSON.parse(filmsInWatched);

  watchedFilms.push(filmId);
  let strWatchedFilms = JSON.stringify(watchedFilms);

  const newWatchedFilmRef = ref(database, 'users/' + userUid);
  update(newWatchedFilmRef, {
    watchedFilms: strWatchedFilms,
  }).catch(error => {
    console.log(error);
  });
}

export function getWatchedFilms() {
  const watchedFilmsListRef = ref(database, 'users/' + userUid);
  onValue(watchedFilmsListRef, snapshot => {
    const data = snapshot.val();
    filmsInWatched = data.watchedFilms;
    localStorage.setItem('watchedMovies', filmsInWatched);
  });
}

function removeWatchedFilm(filmId) {
  getWatchedFilms();
  let watchedFilms = JSON.parse(filmsInWatched);
  watchedFilms.splice(watchedFilms.indexOf(filmId), 1);
  let strWatchedFilms = JSON.stringify(watchedFilms);
  const newWatchedFilmRef = ref(database, 'users/' + userUid);
  update(newWatchedFilmRef, {
    watchedFilms: strWatchedFilms,
  }).catch(error => {
    console.log(error);
  });
}

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
      <div class="movie__img-content">
        <div class="movie__thumb"><img class="movie__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movie" 
      /></div>
      <div class="trailer__button"><button class="trailer__play">Play
          </button></div>
      </div>
          
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
  const isWatched = JSON.parse(filmsInWatched).includes(id);
  if (isWatched) {
    btnWatchedFilms.innerText = 'Remove from watched';
  } else {
    btnWatchedFilms.innerText = 'Add to watched';
  }
  btnWatchedFilms.addEventListener('click', onWatched);

  function onWatched(e) {
    let watchedFilms;
    if (getWatchedFilms()) {
      getWatchedFilms().then(
        data => (watchedFilms = JSON.parse(filmsInWatched) || [])
      );
    } else {
      watchedFilms = JSON.parse(filmsInWatched) || [];
    }
    const item = document.querySelector(`.library__item[data-id="${id}"]`); //костиль
    const isWatched = watchedFilms.includes(id);
    if (!isWatched) {
      e.target.innerText = 'Remove from watched';
      if (setWatchedFilm(id)) {
        setWatchedFilm(id).then(data => watchedFilms.push(id));
      } else {
        watchedFilms.push(id);
      }

      item === null ? 'continue' : item.classList.remove('disable');
    } else {
      const movieWatchedIdIndex = watchedFilms.indexOf(id);
      if (removeWatchedFilm(id)) {
        removeWatchedFilm(id).then(data =>
          watchedFilms.splice(movieWatchedIdIndex, 1)
        );
      } else {
        watchedFilms.splice(movieWatchedIdIndex, 1);
      }
      e.target.innerText = 'Add to watched';
      localStorage.removeItem('watchedMovies', id);
      item === null ? 'continue' : item.classList.add('disable');
    }
  }

  const btnQueueFilms = document.querySelector('.movie__queue');
  // let queueFilms = JSON.parse(filmsInQueue) || [];
  const isQueue = JSON.parse(filmsInQueue).includes(id);
  if (isQueue) {
    btnQueueFilms.innerText = 'Remove from queue';
  } else {
    btnQueueFilms.innerText = 'Add to queue';
  }
  btnQueueFilms.addEventListener('click', onQueue);

  function onQueue(e) {
    let queueFilms;
    if (getQueuedFilms()) {
      getQueuedFilms().then(
        data => (queueFilms = JSON.parse(filmsInQueue) || [])
      );
    } else {
      queueFilms = JSON.parse(filmsInQueue) || [];
    }

    const item = document.querySelector(`.library__item[data-id="${id}"]`); //костиль
    const isQueue = queueFilms.includes(id);

    if (!isQueue) {
      e.target.innerText = 'Remove from queue';
      if (setQueuedFilm(id)) {
        setQueuedFilm(id).then(data => queueFilms.push(id));
      } else {
        queueFilms.push(id);
      }
      item === null ? 'continue' : item.classList.remove('disable');
    } else {
      e.target.innerText = 'Add to queue';
      const movieQueueIdIndex = queueFilms.indexOf(id);
      if (removeQueuedFilm(id)) {
        removeQueuedFilm(id).then(data =>
          queueFilms.splice(movieQueueIdIndex, 1)
        );
      } else {
        queueFilms.splice(movieQueueIdIndex, 1);
      }

      item === null ? 'continue' : item.classList.add('disable');
    }
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
