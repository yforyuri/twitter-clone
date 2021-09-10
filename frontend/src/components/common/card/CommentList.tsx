import { FC } from 'react';
import { useCommentList } from '../../../hooks/useCommentList';
import { ITweet } from '../../../interfaces';
import Comment from './Comment';

interface CommentListProps {
  tweet: ITweet;
}

const CommentList: FC<CommentListProps> = ({ tweet }) => {
  const { data } = useCommentList(tweet);

  return (
    <ul>
      {data?.map((comment) => {
        return <Comment key={comment.id} comment={comment} tweet={tweet} />;
      })}
    </ul>
  );
};

export default CommentList;
