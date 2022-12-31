import { FilmsApiService } from './apiService';
import createGenresMarkup from './create-genres-markup';
const filmsApiService = new FilmsApiService();

const list = document.querySelector('.movies__list');

export default function renderMovieCard(movies) {
  const markupOfMovieCard = movies.results
    .map(({ id, genre_ids, original_title, poster_path, release_date }) => {
      const releaseYear = release_date.slice(0, 4);
      const posterUrl = 'https://image.tmdb.org/t/p/w500/' + poster_path;

      const genresMarkup = createGenresMarkup(genre_ids);

      return `<li class="movies__item" data-id="${id}">
            <div class="movies__poster">
                <img src="${posterUrl}" alt="${original_title}" class="movies__image" />
            </div>
            <div class="film__meta">
                <p class="movies__title">${original_title}</p>
                <p class="movies__info"><span class="film__genre">${genresMarkup}</span> | <span class="film__year">${releaseYear}</span></p>
            </div>
        </li>`;
    })
    .join('');
  list.insertAdjacentHTML('beforeend', markupOfMovieCard);
}
