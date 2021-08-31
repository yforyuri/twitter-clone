import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { MutatorCallback } from 'swr/dist/types';
import ProfileIcon from '../common/ProfileIcon';
import { ITweet } from '../../interfaces';

export interface CreateTweetProps {
  mutate: (
    data?:
      | ITweet[][]
      | Promise<ITweet[][]>
      | MutatorCallback<ITweet[][]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ITweet[][] | undefined>;
}

const CreateTweet: FC<CreateTweetProps> = ({ mutate }) => {
  const token = localStorage.getItem('token');

  const [tweet, setTweet] = useState<string>('');

  const onChangeTweet = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTweet(value);
  };

  const onSubmitTweet = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/tweets`,
        { tweet },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'Created') {
        setTweet('');
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => console.log(localStorage.getItem('token')));

  return (
    <div className="border-b-1 flex">
      <div className="mt-2 mx-4">
        <ProfileIcon />
      </div>
      <form className="w-full" onSubmit={onSubmitTweet}>
        <input
          className="w-full text-xl focus:outline-none place-holder-grey-600 my-6"
          placeholder="What's happening?"
          value={tweet}
          onChange={onChangeTweet}
        />
        <div className="flex items-center text-purple-500 pb-2 border-b-1 mr-4">
          <FontAwesomeIcon icon={faTwitter} />
          <span className="ml-1 text-sm font-bold">Twitter Clone!</span>
        </div>
        <div className="flex justify-end mr-4 my-4">
          <input
            className="rounded-full px-4 py-2 text-sm font-black text-white bg-purple-600"
            type="submit"
            value="Tweet"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;
