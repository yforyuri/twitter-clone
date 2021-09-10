import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { toastError } from '../../../utils/toastify';
import axios from 'axios';
import useSWR from 'swr';
import { ITweet } from '../../../interfaces';

interface CommentButtonProps {
  tweet: ITweet;
  commentToggle: boolean;
  setCommentToggle: Dispatch<SetStateAction<boolean>>;
}

const CommentButton: FC<CommentButtonProps> = ({
  tweet,
  commentToggle,
  setCommentToggle,
}) => {
  const onClickCommentToggle = () => {
    setCommentToggle(!commentToggle);
  };

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const { data } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/comments/count/tweets/${tweet.id}`,
    fetcher,
  );
  return (
    <button className="w-full" onClick={onClickCommentToggle}>
      <FontAwesomeIcon icon={farComment} />
      <span className="ml-2">{data ? data : ''}</span>
    </button>
  );
};

export default CommentButton;
