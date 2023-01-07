import { FilmsApiService } from '../api-service';
import { refs } from '../refs';
import openMovieModal from '../open-movie-modal';
import closeMovieModalWindow from '../close-modal-window';
import Pagination from 'tui-pagination';

const generateGenresString = genres => {
  if (genres.length <= 2) {
    return genres.map(genre => genre.name).join(', ');
  } else if (genres.length === 0) {
    return 'no genres';
  } else if (genres.length > 2) {
    return (
      genres
        .map(genre => genre.name)
        .slice(0, 2)
        .join(', ') + ', Other'
    );
  }
};

const createLibraryMovieItem = ({
  id,
  poster_path,
  title,
  genres,
  release_date,
  vote_average,
}) => {
  document.addEventListener('click', openMovieModal);
  refs.closeModalIcon.addEventListener('click', closeMovieModalWindow);
  const genresList = generateGenresString(genres);
  return `
    <li class="library__item" data-id="${id}">
            <div class="library__poster">
                <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" class="library__image" data-target="card"/>
            </div>
            <div class="library__meta">
                <p class="library__title" data-target="card">${title}</p>
                <p class="library__info" data-target="card">
                    <span class="library__genre">${genresList}</span> |
                    <span class="library__year">${release_date.slice(
                      0,
                      4
                    )}</span>
                    <span class="library__rate">${String(vote_average).slice(
                      0,
                      3
                    )}</span></p>
            </div>
        </li>
    `;
};

const filmsApiService = new FilmsApiService();

function renderLibrary(movies) {
  for (let i = 0; i < movies.length; i += 1)
    filmsApiService.getFilmsById(movies[i]).then(response => {
      refs.library.insertAdjacentHTML(
        'beforeend',
        createLibraryMovieItem(response)
      );
      paginationOnLibrary();
    });
        
}

async function paginationOnLibrary() {
  const options = {
    totalItems: filmsApiService.totalPages,
    itemsPerPage: 3,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination = new Pagination(refs.pagination, options);
  // pagination.reset();
  await pagination.on('beforeMove', function (eventData) {
    refs.library.innerHTML = '';
  });
  
  await pagination.on('afterMove', function (eventData) {
    filmsApiService.page = eventData.page;
    filmsApiService.getFilmsById().then(films => {
      filmsApiService.page = 1;
      refs.library.innerHTML = createLibraryMovieItem(films.results);
    });
  });
}
export { renderLibrary, paginationOnLibrary };
