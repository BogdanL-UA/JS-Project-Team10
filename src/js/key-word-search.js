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

  const searchValue = searchQuery.value.trim();

  if (!searchValue) {
    Notify.failure('What would you like to see?');
    Loading.remove();
    return;
  }

  filmsApiService.resetPage();
  filmsApiService.query = searchValue;

  const data = await filmsApiService.getFilmsByQuery(filmsApiService.page);

  if (data.results.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    Loading.remove();
    return;
  }

  Notify.success(`We found ${data.results.length} films.`);

  console.log(data.results);

  Loading.remove();
  refs.searchForm.reset();
}

refs.searchForm.addEventListener('submit', onFormSubmit);
