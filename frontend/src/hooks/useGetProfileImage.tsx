import axios from 'axios';
import useSWR from 'swr';
import { toastError } from '../utils/toastify';

export const useGetProfileImage = (userId: number) => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const { data, mutate } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/users/profile/image/${userId}`,
    fetcher,
  );

  return { data, mutate };
};
