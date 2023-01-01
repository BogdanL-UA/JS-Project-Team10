import { refs } from './refs';
import axios from 'axios';
import  trendMovieCardTmpl  from './cardTmpl';



function createMovieCard(films) {
  return films.results.map(
    ({ title, release_date, poster_path, id, genre_ids }) => {

   
      refs.filmsGallery.insertAdjacentHTML(
        'afterbegin',
        trendMovieCardTmpl({ title, release_date, poster_path, id, genre_ids }),
      );
    },
  );
}


export { createMovieCard };
