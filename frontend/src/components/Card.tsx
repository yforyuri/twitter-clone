import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import React, { FC } from 'react';
import { ITweet } from '../interfaces';
import ProfileIcon from './ProfileIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment as farComment,
  faHeart as farHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

interface CardsProps {
  tweet: ITweet;
}

const Card: FC<CardsProps> = ({ tweet }) => {
  dayjs.extend(relativeTime);
  return (
    <li className="flex border-b-1">
      <div className="mt-4 mx-4">
        <ProfileIcon />
      </div>
      <div className="mt-6 text-sm bg-red-100 w-full ml-4">
        <span className="font-bold">{tweet.users.nickname}</span>
        <span className="ml-2 text-gray-500">
          {dayjs(tweet.createdAt).locale('ko').fromNow()}
        </span>
        <div>{tweet.tweet}</div>
        <div className="flex justify-between my-4">
          <div className="w-full">
            <FontAwesomeIcon icon={farComment} />
            <span className="ml-2">123</span>
          </div>
          <div className="w-full">
            <FontAwesomeIcon icon={faRetweet} />
            <span className="ml-2">123</span>
          </div>
          <div className="w-full">
            <FontAwesomeIcon icon={farHeart} />
            <span className="ml-2">123</span>
          </div>
          <div className="w-full">
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
