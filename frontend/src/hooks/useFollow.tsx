import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export const useFollowers = (userId: number) => {
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/users/followers/${userId}`,
    fetcher,
  );

  return { data, error, mutate };
};

export const useFollowings = (userId: number) => {
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/users/followings/${userId}`,
    fetcher,
  );

  return { data, error, mutate };
};
