import { refs } from './refs';
import createGenresMarkup from './create-genres-markup';

export default function renderMovieModal({
  poster_path,
  title,
  vote_count,
  vote_average,
  popularity,
  original_title,
  genres,
  overview,
}) {
  const movieGenresMarkup = getMovieGenresArr(genres);

  console.log(movieGenresMarkup);
  const movieModalMarkup = `<form class="movie">
      <span class="movie__wrapper"
        ><img class="movie__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movie"
      /></span>
      <span class="movie__wrapper"
        ><h2 class="movie__header">${title}</h2>

      <table class="movie__grid">
        <tr class="movie__row">
          <td class="movie__descr">Vote / Votes</td>
          <td class="movie__descr-value">
            <span class="movie__rating">${vote_average}</span> / ${vote_count}
          </td>
        </tr>
        <tr class="movie__row">
          <td class="movie__descr">Popularity</td>
          <td class="movie__descr-value">${popularity}</td>
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
        ></span
      >
      <button class="close-modal"><svg width="30" height="30">
        <use href="/src/images/sprite.svg#icon-close"></use>
      </svg></button>
    </form>`;
  refs.movieModal.insertAdjacentHTML('afterbegin', movieModalMarkup);
  refs.movieModal.classList.remove('visually-hidden');
}

function getMovieGenresArr(genres) {
  const movieGenresArr = [];
  for (const genre of genres) {
    movieGenresArr.push(genre.id);
  }

  const genreMarkup = createGenresMarkup(movieGenresArr);
  return genreMarkup[0];
}
