const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '78817c69ceeb2b190f57a1a13eaf9936';

const fetchTrendingMovies = () => {
  return fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(
    response => {
      return response.json();
    }
  );
};

export { fetchTrendingMovies };
