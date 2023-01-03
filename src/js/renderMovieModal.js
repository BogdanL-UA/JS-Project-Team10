import { refs } from './refs';
import closeModalWindow from './closeModalWindow';
import createGenresMarkup from './create-genres-markup';
import { disableBodyScroll } from './scrollBlocker';


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
      <div class="movie__img-wrapper"
        ><img class="movie__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movie"
      /></div>
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
  disableBodyScroll(refs.backdrop);

  refs.closeModalIcon.addEventListener('click', closeModalWindow);
}

function getMovieGenresArr(genres) {
  const movieGenresArr = [];
  for (const genre of genres) {
    movieGenresArr.push(genre.id);
  }

  const genreMarkup = createGenresMarkup(movieGenresArr);
  return genreMarkup[0];
}
