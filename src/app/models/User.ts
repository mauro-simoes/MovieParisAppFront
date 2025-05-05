import { Theatre } from './Theatre';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: 'public' | 'admin';
  theatres: Theatre[];
} 