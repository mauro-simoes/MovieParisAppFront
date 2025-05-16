import { LoginRequest, UserInfoResponse } from '../types/auth';
import api from '../../app/utils/api';

export class AuthService {
  private static TOKEN_KEY = 'auth_token';

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static async login(credentials: LoginRequest): Promise<{ token: string }> {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  }

  static async getCurrentUser(): Promise<UserInfoResponse> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw new Error('Failed to get current user');
    }
  }
} 