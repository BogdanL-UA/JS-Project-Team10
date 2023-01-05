import { refs } from './refs';
import closeModalWindow from './closeModalWindow';
import createGenresMarkup from './create-genres-markup';


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

  const movieModalMarkup = `<div class="movie__template" data-id=${id}>
      <span class="movie__wrapper"
        ><img class="movie__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movie"
      /></span>
      <span class="movie__wrapper"
        ><h2 class="movie__header">${title}</h2>

      <table class="movie__grid">
        <tr class="movie__row">
          <td class="movie__descr">Vote / Votes</td>
          <td class="movie__descr-value">
            <span class="movie__rating">${voteNumeric}</span> / ${vote_count}
          </td>
        </tr>
        <tr class="movie__row">
          <td class="movie__descr">Popularity</td>
          <td class="movie__descr-value">${popularityNumeric}</td>
        </tr>
        <tr class="movie__row">
          <td class="movie__descr">Original Title</td>
          <td class="movie__descr-value">${original_title}</td>
        </tr>
          <tr class="movie__row">
            <td class="movie__descr">Genre</td>
            <td class="movie__descr-value">${movieGenresMarkup}</td>
          </tr>
        </table>
        <h3 class="movie__header-about">ABOUT</h3>
        <p class="movie__about">${overview}</p>
        <span class="movie__buttons-wrapper"
          ><button class="movie__watched button--modal">add to Watched</button>
          <button class="movie__queue button--modal">add to queue</button></span
        ></span></div>`;
  refs.movieModal.insertAdjacentHTML('afterbegin', movieModalMarkup);
  refs.backdrop.classList.remove('visually-hidden');
  refs.closeModalIcon.addEventListener('click', closeModalWindow);

  const btnWatchedFilms = document.querySelector('.movie__watched');
  let watchedFilms = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  const isWatched = watchedFilms.includes(id);
  if (isWatched) {
    btnWatchedFilms.innerText = 'Remove from watched';
  }
  else {
    btnWatchedFilms.innerText = 'Add to watched';
  }
  btnWatchedFilms.addEventListener('click', onWatched);  
  
  function onWatched(e) {   
    let watchedFilms = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const isWatched = watchedFilms.includes(id);
    if (!isWatched) {
      watchedFilms.push(id);
      e.target.innerText = 'Remove from watched';
    }
    else {
      const movieIdIndex = watchedFilms.indexOf(id);
      watchedFilms.splice(movieIdIndex, 1);
      e.target.innerText = 'Add to watched';
    }    
    localStorage.setItem('watchedMovies', JSON.stringify(watchedFilms));    
  }
  
  const btnQueueFilms = document.querySelector('.movie__queue');
  let queueFilms = JSON.parse(localStorage.getItem('queueMovies')) || [];
  const isQueue = queueFilms.includes(id);
  if (isQueue) {
    btnQueueFilms.innerText = 'Remove from queue';
  }
  else {
    btnQueueFilms.innerText = 'Add to queue';
  }
  btnQueueFilms.addEventListener('click', onQueue);  
  
  function onQueue(e) {   
    let queueFilms = JSON.parse(localStorage.getItem('queueMovies')) || [];
    const isQueue = queueFilms.includes(id);
    if (!isQueue) {
      queueFilms.push(id);
      e.target.innerText = 'Remove from queue';
    }
    else {
      const movieQueueIdIndex = queueFilms.indexOf(id);
      queueFilms.splice(movieQueueIdIndex, 1);
      e.target.innerText = 'Add to queue';
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
