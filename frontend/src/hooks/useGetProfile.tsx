import axios from 'axios';
import useSWR from 'swr';
import { IProfile } from '../interfaces';
import { toastError } from '../utils/toastify';

export const useGetProfile = (userId: number) => {
  const fetcher = async (url: string) => {
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

  const { data, error, mutate } = useSWR<IProfile>(
    `${process.env.REACT_APP_BACK_URL}/users/profile/${userId}`,
    fetcher,
  );

  return { data, error, mutate };
};
