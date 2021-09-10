import { FC } from 'react';
import { IComment } from '../../../interfaces';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

interface CommentProps {
  comment: IComment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  dayjs.extend(relativeTime);
  return (
    <li className="flex justify-between my-1 text-xs w-48">
      <div>
        <span className="font-bold mr-2 text-sm">{comment.user.nickname}</span>
        {comment.comment}
      </div>
      <div>{dayjs(comment.createdAt).locale('ko').fromNow()}</div>
    </li>
  );
};

export default Comment;
