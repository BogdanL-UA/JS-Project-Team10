import { Notify } from 'notiflix';
import { refs } from './refs';
import { FilmsApiService } from './api-service';
// import { paginationOnQuery } from './pagination';
import { createGallery } from './create-search-gallery';

import Loading from './spinner';
import Pagination from 'tui-pagination';

const filmsApiService = new FilmsApiService();

export default async function onFormSubmit(e) {
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

  Notify.success(`We found ${data.total_results} films.`);

  const markup = createGallery(data.results);
  refs.gallery.innerHTML = markup;
  paginationOnQuery();

  Loading.remove();
  refs.searchForm.reset();
  refs.searchForm.addEventListener('submit', onFormSubmit);
}

async function paginationOnQuery() {
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
  await pagination.on('beforeMove', function (eventData) {
    refs.gallery.innerHTML = '';
  });
  
  await pagination.on('afterMove', function (eventData) {
    filmsApiService.page = eventData.page;
    filmsApiService.getFilmsByQuery().then(films => {
      filmsApiService.page = 1;
      refs.gallery.innerHTML = createGallery(films.results);
    });
  });
}
