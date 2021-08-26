import React, { FC } from 'react';
import { ITweet } from '../../../interfaces';
import Card from './Card';

interface CardsPropd {
  tweets: ITweet[];
}

const Cards: FC<CardsPropd> = ({ tweets }) => {
  return (
    <div>
      {tweets.map((tweet) => {
        return <Card key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
};

export default Cards;
