import renderMovieModal from './renderMovieModal';
import { FilmsApiService } from './apiService';

const BASE_YT_URL = 'https://www.youtube.com/embed/';

const filmsApiService = new FilmsApiService();

export default function openMovieModal(e) {
  const movieCardEl = e.target.closest('li');
  const movieId = movieCardEl.dataset.id;
  console.log(movieId);

  document.removeEventListener('click', openMovieModal);

  filmsApiService
    .getFilmsById(movieId)
    .then(renderMovieModal)
    .then(data => {
      const iframeTarget = document.querySelector('.trailer__target');
      const playTrailer = document.querySelector('.trailer__play');

      filmsApiService.getTrailerById(movieId).then(data => {
        let theOne = '';
        data.results.find(result => {
          if (result.name.includes('Trailer')) {
            return (theOne = result);
          }
        });
        playTrailer.addEventListener('click', onTrailerPlay);
        function onTrailerPlay() {
          iframeTarget.classList.remove('visually-hidden');
          iframeTarget.insertAdjacentHTML(
            'afterbegin',
            `  <iframe
          class="trailer"
          src="${BASE_YT_URL}${theOne.key}"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-demia; gyroscope; picture-in-picture" allowfullscreen
        ></iframe><button class="trailer__close">Close</button>`
          );
          const close = document.querySelector('.trailer__close');
          function trailerClose() {
            iframeTarget.classList.add('visually-hidden');
            iframeTarget.innerHTML = '';
            close.removeEventListener('click', trailerClose);
          }
          close.addEventListener('click', trailerClose);
        }
      });
    });
}
