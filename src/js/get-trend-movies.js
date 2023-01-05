import { refs } from './refs';
import trendMovieCardTmpl from './card-tmpl';
import openMovieModal from './open-movie-modal';
import onFormSubmit from './key-word-search';

function createMovieCard(films) {
  document.addEventListener('click', openMovieModal);
  refs.searchForm.addEventListener('submit', onFormSubmit);

  return films.results.map(
    ({ title, release_date, poster_path, id, genre_ids }) => {
      refs.gallery.insertAdjacentHTML(
        'afterbegin',
        trendMovieCardTmpl({ title, release_date, poster_path, id, genre_ids })
      );
    }
  );
}

export { createMovieCard };
