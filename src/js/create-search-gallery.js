import createGenresMarkup from './create-genres-markup';
// searchGenres();

// let getNewId = movieId
//   .filter(genre => genre_ids.includes(genre.id))
//   .map(genre => genre.name)
//   .join(', ');

const noPosterImg =
  'https://freedesignfile.com/upload/2014/07/Movie-time-design-elements-vector-backgrounds-01.jpg';
const fileSize = `w500`;
const basePosterUrl = 'https://image.tmdb.org/t/p/';

function generatePosterImgLink(poster_path) {
  if (poster_path === null) {
    return noPosterImg;
  }
  return `${basePosterUrl}${fileSize}${poster_path}`;
}

export function createGallery(film) {
  return film
    .map(({ id, genre_ids, original_title, poster_path, release_date }) => {
      const releaseYear = release_date.slice(0, 4);

      const genresMarkup = createGenresMarkup(genre_ids);

      return `<li class="movies__item" data-id="${id}">
            <div class="movies__poster">
                <img src="${generatePosterImgLink(
                  poster_path
                )}" alt="${original_title}" class="movies__image" data-target="card"/>
            </div>
            <div class="film__meta">
                <p class="movies__title" data-target="card">${original_title}</p>
                <p class="movies__info" data-target="card"><span class="film__genre" data-target="card">${genresMarkup}</span> | <span class="film__year">${releaseYear}</span></p>
            </div>
        </li>`;
    })
    .join('');
}
