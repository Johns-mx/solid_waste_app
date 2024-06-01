// services/townHallService.ts
import axios from 'axios';
import { iCommunity, iApiResponse } from '../interfaces/Interfaces';

const API_URL = 'http://localhost:8000/api/v1/town_hall';

// Get all the cities
export const getAllTownHalls = async (): Promise<iCommunity[]> => {
  try {
    const response = await axios.get<iApiResponse<iCommunity[]>>(
      `${API_URL}/get_all`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.error) {
      throw new Error(response.data.message);
    }
    return response.data.res;
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching town halls:', error);
    throw error;
  }
};

export const get_all_town_halls = async (): Promise<iCommunity[]> => {
  try {
    const response = await fetch(`${API_URL}/get_all`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data.res;
  } catch (error) {
    console.error('Error fetching town halls:', error);
    throw error;
  }
};
