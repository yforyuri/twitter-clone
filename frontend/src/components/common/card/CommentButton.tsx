import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { ITweet } from '../../../interfaces';
import { useCommentCount } from '../../../hooks/useCommentCount';

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
  const { data } = useCommentCount(tweet);

  const onClickCommentToggle = () => {
    setCommentToggle(!commentToggle);
  };

  return (
    <div className="w-full">
      <button onClick={onClickCommentToggle}>
        <FontAwesomeIcon icon={farComment} />
        <span className="ml-2">{data ? data : ''}</span>
      </button>
    </div>
  );
};

export default CommentButton;
