import { FC } from 'react';
import { IComment } from '../../../interfaces';

interface CommentProps {
  comment: IComment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <li>
      <div>
        <span>{comment.user.nickname}</span>
        {comment.comment}
      </div>
      <div>{comment.createdAt}</div>
    </li>
  );
};

export default Comment;
