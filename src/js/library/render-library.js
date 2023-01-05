import { FilmsApiService } from '../apiService';
import { refs } from './library-refs';

const generateGenresString = (genres) => {
    if (genres.length < 2) {
        return genres.map(genre => genre.name).join(', ');
    } else if (genres.length === 0) {
        return 'no genres';
    } else if (genres.length > 2) {
        return genres.map(genre => genre.name).slice(0, 2).join(', ') + ', Other';
    }
}

const createLibraryMovieItem = ({ id, poster_path, title, genres, release_date, vote_average }) => {
    
    const genresList = generateGenresString(genres);
    return `
    <li class="library__item" data-id="${id}">
            <div class="library__poster">
                <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" class="library__image" />
            </div>
            <div class="library__meta">
                <p class="library__title">${title}</p>
                <p class="library__info">
                    <span class="library__genre">${genresList}</span> |
                    <span class="library__year">${release_date.slice(0, 4)}</span>
                    <span class="library__rate">${String(vote_average).slice(0, 3)}</span></p>
            </div>
        </li>
    ` ;
}

const filmsApiService = new FilmsApiService();

function renderLibrary(movies) {
    for (let i = 0; i < movies.length; i += 1)
        filmsApiService.getFilmsById(movies[i]).then(response => {
        
        refs.library.insertAdjacentHTML('beforeend', createLibraryMovieItem(response));
    });
}

export { renderLibrary };