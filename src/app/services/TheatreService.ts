import { Theatre } from '../models/Theatre';
import api from '../utils/api';

const mockTheatres: Theatre[] = [
  { id: 1, name: 'Cinema Paris', city: 'Paris', address: '123 Champs-Élysées' },
  { id: 2, name: 'Grand Rex', city: 'Paris', address: '1 Boulevard Poissonnière' },
];

const USE_MOCK = true; // Set to false to use real API when ready

export class TheatreService {
  static async getTheatre(id: number): Promise<Theatre | undefined> {
    if (USE_MOCK) {
      return mockTheatres.find((t) => t.id === id);
    }
    // Example API call (to be implemented)
    // const response = await api.get(`/theatres/${id}`);
    // return response.data;
    return undefined;
  }

  static async getAllTheatres(): Promise<Theatre[]> {
    if (USE_MOCK) {
      return mockTheatres;
    }
    // Example API call (to be implemented)
    // const response = await api.get('/theatres');
    // return response.data;
    return [];
  }
} 