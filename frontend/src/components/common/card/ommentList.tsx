import axios from 'axios';
import { FC } from 'react';
import useSWR from 'swr';
import { IComment, ITweet } from '../../../interfaces';
import { toastError } from '../../../utils/toastify';
import Comment from './Comment';

interface CommentListProps {
  tweet: ITweet;
}

const CommentList: FC<CommentListProps> = ({ tweet }) => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const { data } = useSWR<IComment[]>(
    `${process.env.REACT_APP_BACK_URL}/comments/tweets/${tweet.id}`,
    fetcher,
  );

  return (
    <ul>
      {data?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentList;
