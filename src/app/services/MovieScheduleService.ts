import { MovieSchedule } from '../models/MovieSchedule';
import api from '../utils/api';

export const movieScheduleService = {
  async getSchedulesByMovieId(movieId: number): Promise<MovieSchedule[]> {
    const response = await api.get(`/schedules/get/${movieId}`);
    return response.data;
  },

  async getSchedulesByTheatreId(theatreId: number): Promise<MovieSchedule[]> {
    const response = await api.get(`/schedules/theatre/${theatreId}`);
    return response.data;
  },

  async addSchedule(schedule: Omit<MovieSchedule, 'id'>): Promise<MovieSchedule> {
    const response = await api.post('/schedules', schedule);
    return response.data;
  },

  async updateSchedule(id: number, schedule: Partial<MovieSchedule>): Promise<MovieSchedule> {
    const response = await api.put(`/schedules/${id}`, schedule);
    return response.data;
  },

  async deleteSchedule(id: number): Promise<void> {
    await api.delete(`/schedules/${id}`);
  }
}; 