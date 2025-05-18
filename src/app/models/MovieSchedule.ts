import { Movie } from './Movie';
import { Theatre } from './Theatre';

export interface MovieSchedule {
  id: number;
  movieId: number;
  theatreId: number;
  movieTitle: string;
  theatreName: string;
  startDate: string;
  endDate: string;
  daysOfWeek: string;
  time: string;
} 