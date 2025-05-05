import { User } from '../models/User';
import { Theatre } from '../models/Theatre';
import api from '../utils/api';

const mockTheatres: Theatre[] = [
  { id: 1, name: 'Cinema Paris', city: 'Paris', address: '123 Champs-Élysées' },
  { id: 2, name: 'Grand Rex', city: 'Paris', address: '1 Boulevard Poissonnière' },
];

const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    passwordHash: 'admin123',
    role: 'admin',
    theatres: mockTheatres,
  },
  {
    id: 2,
    username: 'public',
    passwordHash: 'public123',
    role: 'public',
    theatres: [],
  },
];

const USE_MOCK = true; // Set to false to use real API when ready

export class UserService {
  static async authenticate(username: string, password: string): Promise<User | null> {
    if (USE_MOCK) {
      return (
        mockUsers.find(
          (u) => u.username === username && u.passwordHash === password
        ) || null
      );
    }
    // Example API call (to be implemented)
    // const response = await api.post('/auth/login', { username, password });
    // return response.data;
    return null;
  }

  static async getUsers(): Promise<User[]> {
    if (USE_MOCK) {
      return mockUsers;
    }
    // Example API call (to be implemented)
    // const response = await api.get('/users');
    // return response.data;
    return [];
  }
} 