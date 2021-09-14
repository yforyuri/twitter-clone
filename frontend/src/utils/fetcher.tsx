import axios from 'axios';
import { toastError } from './toastify';

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error: any) {
    console.error(error);
    toastError(error.response.data.message);
  }
};

export const tokenFetcher = async (url: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error);
    toastError(error.response.data.message);
  }
};
