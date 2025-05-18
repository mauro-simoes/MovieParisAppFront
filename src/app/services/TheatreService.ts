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

  static async createTheatre(theatre: Omit<Theatre, 'id'>): Promise<Theatre> {
    try {
      const response = await api.post('/theatres', theatre);
      return response.data;
    } catch (error) {
      console.error('Failed to create theatre:', error);
      throw new Error('Failed to create theatre');
    }
  }

  static async deleteTheatre(id: number): Promise<void> {
    try {
      await api.delete(`/theatres/${id}`);
    } catch (error) {
      console.error(`Failed to delete theatre ${id}:`, error);
      throw new Error('Failed to delete theatre');
    }
  }
} 