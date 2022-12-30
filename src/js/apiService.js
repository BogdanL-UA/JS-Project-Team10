import axios from 'axios';
const TMD_KEY = '78817c69ceeb2b190f57a1a13eaf9936';
const BASE_URL = 'https://api.themoviedb.org/3';

export class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async getFilmsByQuery() {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${TMD_KEY}&query=${this.searchQuery}&page=${this.page}`
    );

    return response.data;
  }

  async fetchGenres() {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=b8c69e73ca2b06d4109ce06d6df842ad`
    );

    return response.json();
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
