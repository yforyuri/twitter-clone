import axios from 'axios';
import useSWR from 'swr';
import { ITweet } from '../interfaces';
import { toastError } from '../utils/toastify';

export const useCommentCount = (tweet: ITweet) => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const { data, mutate } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/comments/count/tweets/${tweet.id}`,
    fetcher,
  );

  return { data, mutate };
};
