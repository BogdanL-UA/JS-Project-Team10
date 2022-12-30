import { searchGenres, movieId } from './genres';

searchGenres();

let getNewId = movieId
  .filter(genre => genre_ids.includes(genre.id))
  .map(genre => genre.name)
  .join(', ');

export function createGallery(film) {
  return film
    .map(
      ({
        title,
        poster_path,
        genre_ids,
        release_date,
        id,
      }) => `<li class="trend-movies__item" data-id="${id}">
            <div class="trend-movies__poster">
                <img src="${`https://image.tmdb.org/t/p/w500/${poster_path}`}" alt="${title}" class="trend-movies__image" />
            </div>
            <div class="trend-movies__meta">
                <p class="trend-movies__title">${title}</p>
                <p class="trend-movies__info"><span class="trend-movies__genre">${getNewId}</span> | <span class="trend-movies__year">${release_date.substring(
        0,
        4
      )}</span></p>
            </div>
        </li>`
    )
    .join('');
}
