import { FC, useContext } from 'react';
import { IComment, ITweet } from '../../../interfaces';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MeContext } from '../../../contexts';
import axios from 'axios';
import { useCommentCount } from '../../../hooks/useCommentCount';
import { useCommentList } from '../../../hooks/useCommentList';

interface CommentProps {
  comment: IComment;
  tweet: ITweet;
}

const Comment: FC<CommentProps> = ({ comment, tweet }) => {
  dayjs.extend(relativeTime);

  const { me } = useContext(MeContext);

  const { mutate: countMutate } = useCommentCount(tweet);
  const { mutate: commentMutate } = useCommentList(tweet);

  const onClickDeleteComment = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/comments/${comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        countMutate();
        commentMutate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <li className="flex justify-between my-1 text-xs w-80">
      <div>
        <span className="font-bold mr-2 text-sm">{comment.user.nickname}</span>
        {comment.comment}
      </div>
      <div>
        {me === comment.user.id && (
          <button className="" onClick={onClickDeleteComment}>
            <FontAwesomeIcon className="mr-2" icon={faTrashAlt} />
          </button>
        )}
        {dayjs(comment.createdAt).locale('ko').fromNow()}
      </div>
    </li>
  );
};

export default Comment;
