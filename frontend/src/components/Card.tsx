import React, { FC } from 'react';
import { ITweet } from '../interfaces';
import ProfileIcon from './ProfileIcon';

interface CardsProps {
  tweet: ITweet;
}

const Card: FC<CardsProps> = ({ tweet }) => {
  return (
    <div className="flex">
      <div>
        <ProfileIcon />
      </div>
      <div>{tweet.users.nickname}</div>
    </div>
  );
};

export default Card;
