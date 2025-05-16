import { Movie } from '../models/Movie';
import api from '../utils/api';

export const movieService = {
  async getAllMovies(): Promise<Movie[]> {
    const response = await api.get('/movies');
    return response.data;
  },

  async getMoviesByCity(city: string): Promise<Movie[]> {
    const response = await api.get(`/movies?city=${city}`);
    return response.data;
  },

  async getMovie(id: number): Promise<Movie> {
    const response = await api.get(`/movies/get/${id}`);
    return response.data;
  },

  async addMovie(movie: Movie): Promise<Movie> {
    const response = await api.post('/movies', movie);
    return response.data;
  }
}; 