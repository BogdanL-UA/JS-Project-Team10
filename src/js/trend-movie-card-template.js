export default function trendMovieCardTmpl({ title, posterPath, genre_ids, releaseDate }) {

    // рік виходу фільма
    const releaseYear = releaseDate.slice(0, 4);

    //посилання на постер, поки що без варіантів для різних медіа
    const posterUrl = 'https://image.tmdb.org/t/p/w500/' + posterPath;

    //підставити замість кодів жанрів назви жанрів
    // const convertedGenres = convertGenres(genre_ids);
    const convertedGenres = 'temp genre list'

    return `<li class="popular-films__item" data-id="${id}">
            <div class="film__poster">
                <img src="${posterUrl}" alt="${title}" class="film__img" />
            </div>
            <div class="film__meta">
                <p class="film__name">${title}</p>
                <p class="film__info"><span class="film__genre">${convertedGenres}</span> | <span class="film__year">${releaseYear}</span></p>
            </div>
        </li>`;
};