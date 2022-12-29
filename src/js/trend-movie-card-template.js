function trendMovieCardTmpl({
  title,
  poster_path,
  genre_ids,
  release_date,
  id,
}) {
  // рік виходу фільма
  //   const releaseYear = releaseDate.slice(0, 4);

  //посилання на постер, поки що без варіантів для різних медіа
  //   const posterUrl = 'https://image.tmdb.org/t/p/w500/' + posterPath;

  //підставити замість кодів жанрів назви жанрів
  // const convertedGenres = convertGenres(genre_ids);
  const convertedGenres = 'temp genre list';

  return `<li class="trend-movies__item" data-id="${id}">
            <div class="trend-movies__poster">
                <img src="${`https://image.tmdb.org/t/p/w500/${poster_path}`}" alt="${title}" class="trend-movies__image" />
            </div>
            <div class="trend-movies__meta">
                <p class="trend-movies__title">${title}</p>
                <p class="trend-movies__info"><span class="trend-movies__genre">${convertedGenres}</span> | <span class="trend-movies__year">${release_date.slice(
    0,
    4
  )}</span></p>
            </div>
        </li>`;
}
export { trendMovieCardTmpl };
