import { User } from '../models/User';
import api from '../utils/api';

interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
}

export class UserService {
  static async authenticate(username: string, password: string): Promise<{ username: string; token: string } | null> {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      console.error('Authentication failed:', error);
      return null;
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw new Error('Failed to get current user');
    }
  }

  static async getUsers(): Promise<UserResponse[]> {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }
} 