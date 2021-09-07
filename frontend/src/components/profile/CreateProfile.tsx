import axios from 'axios';
import React, { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { MutatorCallback } from 'swr/dist/types';
import { useInput } from '../../hooks';
import { IProfile } from '../../interfaces';
import { toastError, toastSuccess } from '../../utils/toastify';

interface CreateProfileProps {
  profileMutate: (
    data?: IProfile | Promise<IProfile> | MutatorCallback<IProfile> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<IProfile | undefined>;
  setToggleIntroduce?: Dispatch<SetStateAction<boolean>>;
}

const CreateProfile: FC<CreateProfileProps> = ({
  profileMutate,
  setToggleIntroduce,
}) => {
  const [introduce, onChangeIntroduce] = useInput('');

  const onSubmitIntroduce = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/users/introduce`,
        {
          introduce,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        if (setToggleIntroduce) setToggleIntroduce(false);
        profileMutate();
        toastSuccess('introduce message has been successfully changed');
      }
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  return (
    <form onSubmit={onSubmitIntroduce}>
      <input
        type="text"
        value={introduce}
        onChange={onChangeIntroduce}
        placeholder="Add introduction to your profile"
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateProfile;
