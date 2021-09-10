import axios from 'axios';
import React, { FC, FormEvent } from 'react';
import { useInput } from '../../../hooks';
import { useCommentCount } from '../../../hooks/useCommentCount';
import { useCommentList } from '../../../hooks/useCommentList';
import { ITweet } from '../../../interfaces';

interface CommentForm {
  tweet: ITweet;
}

const CommentForm: FC<CommentForm> = ({ tweet }) => {
  const [comment, onChangeComment, setComment] = useInput('');

  const { mutate: countMutate } = useCommentCount(tweet);

  const { mutate: commentMutate } = useCommentList(tweet);

  const onSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!comment) return;

      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/comments/tweets/${tweet.id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'Created') {
        setComment('');
        countMutate();
        commentMutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitComment}>
      <input
        className="focus:outline-none w-full placeholder-gray-600 mb-2"
        type="text"
        placeholder="leave a comment"
        value={comment}
        onChange={onChangeComment}
      />
      <input
        className={`rounded-full px-2 py-1 text-xs font-bold text-white bg-purple-500 mb-2 focus:outline-none ${
          !comment && 'opacity-50'
        }`}
        type="submit"
        value="Reply"
      />
    </form>
  );
};

export default CommentForm;
