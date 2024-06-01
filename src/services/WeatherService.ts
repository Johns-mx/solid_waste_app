import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_URL_BASE } from '@env';
import {
  iLocationRequest,
  iCondition,
  iCurrent,
  iLocation,
  iWeatherApiResponse,
} from '../interfaces/iWeather';

export const get_current_local_weather = async (
  location: iLocationRequest
): Promise<iWeatherApiResponse> => {
  try {
    const response = await axios.get(`${WEATHER_URL_BASE}/current.json`, {
      headers: {
        Accept: 'application/json',
      },
      params: {
        key: WEATHER_API_KEY,
        q: `${location.lat},${location.lng}`,
        lang: 'es',
      },
    });
    if (response.status != 200) {
      throw new Error('No se pudo obtener los datos.');
    }
    return response.data;
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    throw error;
  }
};
