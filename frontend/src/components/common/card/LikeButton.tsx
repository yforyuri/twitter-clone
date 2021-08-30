import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';
import { ITweet } from '../../../interfaces';
import axios from 'axios';
import { MutatorCallback } from 'swr/dist/types';
import useSWR from 'swr';

interface LikeButtonProps {
  tweet: ITweet;
  countMutate: (
    data?: number | Promise<number> | MutatorCallback<number> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<number | undefined>;
}

const LikeButton: FC<LikeButtonProps> = ({ tweet, countMutate }) => {
  const token = localStorage.getItem('token');

  const onClickLike = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/likes/tweets/${tweet.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        countMutate();
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error();
    }
  };

  const { data, mutate } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/likes/islike/tweets/${tweet.id}`,
    fetcher,
  );

  return (
    <button onClick={onClickLike}>
      <FontAwesomeIcon
        className={`text-base ${data?.like && 'text-purple-500'}`}
        icon={data?.like ? faHeart : farHeart}
      />
    </button>
  );
};

export default LikeButton;
