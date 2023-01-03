import axios from 'axios';
import refs from './refs';
const TMD_KEY = '78817c69ceeb2b190f57a1a13eaf9936';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_YT_URL = 'https://www.youtube.com/embed/';
const body = document.body;
const iframeTarget = document.querySelector('.play-trailer');

console.log(iframeTarget);
const getTrailerById = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${TMD_KEY}&language=en-US`
  );

  return response.data;
};
{
  /* <button class="the-trailer">
  <svg class="play-trailer" width="50" height="30">
    <use href="./images/sprite.svg#play-icon"></use>
  </svg>
</button>; */
}

// .then(data => {
//       const iframeTarget = document.querySelector('.trailer-target');
//       const playTrailer = document.querySelector('.the-trailer');
//       filmsApiService.getTrailerById(movieId).then(data => {
//         let theOne = '';
//         data.results.find(result => {
//           if (result.name.includes('Trailer')) {
//             return (theOne = result);
//           }
//         });
//         playTrailer.addEventListener('click', onTrailerPlay);
//         console.log(data.results), console.log(BASE_YT_URL + theOne.key);
//         function onTrailerPlay() {
//           return refs.movieModal.insertAdjacentHTML(
//             'afterbegin',
//             `  <iframe
//           class="trailer"
//           src="${BASE_YT_URL}${theOne.key}"
//           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-demia; gyroscope; picture-in-picture" allowfullscreen
//         ></iframe>`
//           );
//         }
//       });
//     });
// getTrailerById(676547).then(data => {
//   let theOne = '';
//   data.results.find(result => {
//     if (result.name.includes('Trailer')) {
//       return (theOne = result);
//     }
//   });
//   console.log(data.results), console.log(BASE_YT_URL + theOne.key);
//   return body.insertAdjacentHTML(
//     'afterbegin',
//     `  <iframe
//       class="trailer"
//       src="${BASE_YT_URL}${theOne.key}"
//       frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-demia; gyroscope; picture-in-picture" allowfullscreen
//     ></iframe>`
//   );
// });
