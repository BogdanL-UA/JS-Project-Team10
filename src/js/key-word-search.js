import { Notify } from 'notiflix';
import { refs } from './refs';
import { FilmsApiService } from './apiService';
import Loading from './spinner';

const filmsApiService = new FilmsApiService();

async function onFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  Loading.pulse('Loading...', {
    svgColor: '#FF6B08',
  });
  Loading.pulse();

  const searchValue = searchQuery.value.trim();

  if (!searchValue) {
    Notify.failure('What would you like to see?');
    return;
  }

  filmsApiService.resetPage();
  filmsApiService.query = searchValue;

  const data = await filmsApiService.getFilmsByQuery(filmsApiService.page);
  console.log(data);

  Loading.remove();
  refs.searchForm.reset();
}

refs.searchForm.addEventListener('submit', onFormSubmit);
