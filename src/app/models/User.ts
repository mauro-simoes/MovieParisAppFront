import { Theatre } from './Theatre';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: 'ROLE_ADMIN' | 'ROLE_CINEMA_OWNER';
  theatres: Theatre[];
} 