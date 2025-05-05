import { Theatre } from './Theatre';

export interface Movie {
  id: number;
  title: string;
  duration: number;
  language: string;
  director: string;
  mainActors: string[];
  minAge: number;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  days: DayOfWeek[];
  time: string; // ISO time string (e.g., '14:30')
  theatre: Theatre;
}

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'; 