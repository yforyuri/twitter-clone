import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import React, { FC, MutableRefObject, useState } from 'react';
import { ITweet } from '../../../interfaces';
import ProfileIcon from '../ProfileIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import Like from './Like';
import Ellipsis from './Ellipsis';
import { CreateTweetProps } from '../../main/CreateTweet';
import CommentButton from './CommentButton';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export interface CardProps extends CreateTweetProps {
  tweet: ITweet;
  ellipsisEl: MutableRefObject<HTMLDivElement | null>;
}

const Card: FC<CardProps> = ({ tweet, mutate, ellipsisEl }) => {
  dayjs.extend(relativeTime);

  const [commentToggle, setCommentToggle] = useState<boolean>(false);
  return (
    <li className="flex border-b-1">
      <div className="mt-4 mx-4">
        <ProfileIcon userId={tweet.users.id} />
      </div>
      <div className="mt-6 text-sm w-full ml-4">
        <span className="font-bold">{tweet.users.nickname}</span>
        <span className="ml-2 text-gray-500">
          {dayjs(tweet.createdAt).locale('ko').fromNow()}
        </span>
        <div>{tweet.tweet}</div>
        <div className="flex justify-between my-4">
          <CommentButton
            tweet={tweet}
            commentToggle={commentToggle}
            setCommentToggle={setCommentToggle}
          />
          <div className="w-full">
            <FontAwesomeIcon icon={faRetweet} />
            <span className="ml-2">123</span>
          </div>
          <Like tweet={tweet} />
          <Ellipsis tweet={tweet} mutate={mutate} ellipsisEl={ellipsisEl} />
        </div>
        {commentToggle && (
          <div>
            <CommentForm tweet={tweet} />
            <ul>
              <CommentList tweet={tweet} />
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default Card;
