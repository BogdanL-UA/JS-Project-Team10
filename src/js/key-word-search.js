import { Notify } from 'notiflix';
import { refs } from './refs';
import { FilmsApiService } from './apiService';
import { createGallery } from './createSearchGallery';
import Loading from './spinner';
import renderMovieCard from './render-movie-card';
import { createMovieCard } from './get-trend-movies';
// import { paginationOnQuery } from './pagination';
import Pagination from 'tui-pagination';

const filmsApiService = new FilmsApiService();

async function onFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  Loading.pulse('Loading...', {
    svgColor: '#FF6B08',
  });

  const searchValue = searchQuery.value.trim();

  if (!searchValue) {
    Notify.failure('What would you like to see?');
    Loading.remove();
    return;
  }

  filmsApiService.query = searchValue;
Loading.remove();
  const data = await filmsApiService.getFilmsByQuery();

  // const genresFilm = await filmsApiService.fetchGenres();
  // console.log(genresFilm);

  if (data.results.length === 0) {
    Notify.failure(
      'Sorry, there are no films matching your search query. Please try again.'
    );
    Loading.remove();
    return;
  }

  Notify.success(`We found ${data.results.length} films.`);

  const markup = createGallery(data.results);
  refs.gallery.innerHTML = markup;
  paginationOnQuery();

  Loading.remove();
  refs.searchForm.reset();
}

function paginationOnQuery() {
  filmsApiService.page = 1;
  const options = {
    totalItems: FilmsApiService.totalPages,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination = new Pagination(refs.pagination, options);
  pagination.reset();
  pagination.on('beforeMove', function (eventData) {
    filmsApiService.page = eventData.page;
    filmsApiService.getFilmsByQuery().then(films => {
      refs.filmsGallery.innerHTML = '';
      createMovieCard(films);
      // createGallery(data.results);
    });
  });
}
export { paginationOnQuery };

refs.searchForm.addEventListener('submit', onFormSubmit);
