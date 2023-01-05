import createGenresMarkup from './create-genres-markup';

export default function trendMovieCardTmpl({
  id,
  title,
  poster_path,
  genre_ids,
  release_date,
}) {
  // рік виходу фільма
  let releaseYear = release_date.slice(0, 4);

  //посилання на постер, поки що без варіантів для різних медіа
  const posterUrl = 'https://image.tmdb.org/t/p/w500/' + poster_path;

  //підставити замість кодів жанрів назви жанрів
  let convertedGenres = createGenresMarkup(genre_ids);

  return `<li class="movies__item" data-id="${id}">
    <div class="movies__poster">
    <img src="${posterUrl}" alt="${title}" class="movies__image" data-id="${id}" data-target="card"/>
    </div>
        <div class="movies__meta">
            <p class="movies__title" data-target="card">${title}</p>
            <p class="movies__info" data-target="card"><span class="movies__genre" data-target="card">${convertedGenres}</span> | <span class="movies__year">${releaseYear}</span></p>

        </div>
    </li>`;
}
