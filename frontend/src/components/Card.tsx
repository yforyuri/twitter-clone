import React, { FC } from 'react';
import { ITweet } from '../interfaces';
import ProfileIcon from './ProfileIcon';

interface CardsProps {
  tweet: ITweet;
}

const Card: FC<CardsProps> = ({ tweet }) => {
  return (
    <div>
      <ProfileIcon />
      {tweet.tweet}
    </div>
  );
};

export default Card;
