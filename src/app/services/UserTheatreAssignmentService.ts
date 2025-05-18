import api from '../utils/api';

interface UserTheatreAssignment {
  id: number;
  userId: number;
  theatreId: number;
  username: string;
  theatreName: string;
}

export const userTheatreAssignmentService = {
  async getAllAssignments(): Promise<UserTheatreAssignment[]> {
    const response = await api.get('/assignments');
    return response.data;
  },

  async getAssignmentsByUser(userId: number): Promise<UserTheatreAssignment[]> {
    const response = await api.get(`/assignments/user/${userId}`);
    return response.data;
  },

  async getAssignmentsByTheatre(theatreId: number): Promise<UserTheatreAssignment[]> {
    const response = await api.get(`/assignments/theatre/${theatreId}`);
    return response.data;
  },

  async createAssignment(userId: number, theatreId: number): Promise<void> {
    await api.post('/assignments', { userId, theatreId });
  },

  async deleteAssignment(userId: number, theatreId: number): Promise<void> {
    await api.delete(`/assignments?userId=${userId}&theatreId=${theatreId}`);
  }
}; 