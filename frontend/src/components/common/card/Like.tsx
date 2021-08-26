import React, { FC } from 'react';
import { ITweet } from '../../../interfaces';
import axios from 'axios';
import useSWR from 'swr';
import LikeButton from './LikeButton';

interface LikeProps {
  tweet: ITweet;
}

const Like: FC<LikeProps> = ({ tweet }) => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<number>(
    `${process.env.REACT_APP_BACK_URL}/likes/count/tweets/${tweet.id}`,
    fetcher,
  );

  if (error) return <div>loading..</div>;

  return (
    <div className="w-full">
      <LikeButton tweet={tweet} countMutate={mutate} />
      {data !== 0 && <span className="ml-2">{data}</span>}
    </div>
  );
};

export default Like;
