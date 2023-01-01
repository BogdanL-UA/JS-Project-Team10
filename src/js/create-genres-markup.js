const genresList = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export default function createGenresMarkup(genre_ids) {
  const convertedGenres = [];
  const genresMarkup = [];
  for (const genre_id of genre_ids) {
    const genreObj = genresList.find(genre => genre.id === genre_id);
    convertedGenres.push(genreObj.name);
  }
  if (convertedGenres.length === 1) {
    genresMarkup.push(`${convertedGenres[0]}`);
  } else if (convertedGenres.length === 2) {
    genresMarkup.push(`${convertedGenres[0]}, ${convertedGenres[1]}`);
  } else {
    genresMarkup.push(`${convertedGenres[0]}, ${convertedGenres[1]}, Other`);
  }
  return genresMarkup;
}
