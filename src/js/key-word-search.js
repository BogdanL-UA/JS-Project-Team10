import { Notify } from 'notiflix';
import { refs } from './refs';
import { FilmsApiService } from './apiService';
import { createGallery } from './createSearchGallery';
import Loading from './spinner';
import renderMovieCard from './render-movie-card';

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

  Loading.remove();
  refs.searchForm.reset();
}

refs.searchForm.addEventListener('submit', onFormSubmit);
