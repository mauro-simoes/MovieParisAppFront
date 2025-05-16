import { Theatre } from '../models/Theatre';
import api from '../utils/api';

export class TheatreService {
  static async getTheatre(id: number): Promise<Theatre | undefined> {
    try {
      const response = await api.get(`/theatres/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch theatre ${id}:`, error);
      return undefined;
    }
  }

  static async getAllTheatres(): Promise<Theatre[]> {
    try {
      const response = await api.get('/theatres');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch theatres:', error);
      return [];
    }
  }
} 