import apiClient from './client';
import { Concert } from '@/types/concert.types';

export const concertsApi = {
  /**
   * Get all concerts with ticket availability
   */
  getAll: async (): Promise<Concert[]> => {
    const { data } = await apiClient.get<Concert[]>('/concerts');
    return data;
  },

  /**
   * Get single concert by ID
   */
  getById: async (id: string): Promise<Concert> => {
    const { data } = await apiClient.get<Concert>(`/concerts/${id}`);
    return data;
  },
};