import api from '../utils/api';
import { Movie, DayOfWeek } from '../models/Movie';
import { Theatre } from '../models/Theatre';

const mockTheatres: Theatre[] = [
  { id: 1, name: 'Cinema Paris', city: 'Paris', address: '123 Champs-Élysées' },
  { id: 2, name: 'Grand Rex', city: 'Paris', address: '1 Boulevard Poissonnière' },
];

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    duration: 148,
    language: 'English',
    director: 'Christopher Nolan',
    mainActors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
    minAge: 12,
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    days: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
    time: '20:00',
    theatre: mockTheatres[0],
  },
  {
    id: 2,
    title: 'Amélie',
    duration: 122,
    language: 'French',
    director: 'Jean-Pierre Jeunet',
    mainActors: ['Audrey Tautou', 'Mathieu Kassovitz'],
    minAge: 0,
    startDate: '2024-06-05',
    endDate: '2024-07-05',
    days: ['TUESDAY', 'THURSDAY', 'SATURDAY'],
    time: '18:00',
    theatre: mockTheatres[1],
  },
];

const USE_MOCK = true; // Set to false to use real API when ready

export class MovieService {
  static async getMoviesByCity(city: string): Promise<Movie[]> {
    if (USE_MOCK) {
      return mockMovies.filter((m) => m.theatre.city.toLowerCase() === city.toLowerCase());
    }
    // Example API call (to be implemented)
    // const response = await api.get(`/movies?city=${city}`);
    // return response.data;
    return [];
  }

  static async getMovie(id: number): Promise<Movie | undefined> {
    if (USE_MOCK) {
      return mockMovies.find((m) => m.id === id);
    }
    // Example API call (to be implemented)
    // const response = await api.get(`/movies/${id}`);
    // return response.data;
    return undefined;
  }

  static async addMovie(movie: Movie): Promise<boolean> {
    if (USE_MOCK) {
      mockMovies.push(movie);
      return true;
    }
    // Example API call (to be implemented)
    // await api.post('/movies', movie);
    return false;
  }
} 