import { Theatre } from './Theatre';

export interface Movie {
  id: number;
  title: string;
  language: string;
  director: string;
  durationMinutes: number;
  releaseDate: string;
  mainActors?: string[];
  minAge?: number;
  startDate?: string;
  endDate?: string;
  days?: DayOfWeek[];
  time?: string;
  theatre?: Theatre;
  thumbnail: string;
}

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'; 