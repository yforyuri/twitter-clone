import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { FC, useEffect } from 'react';
import useSWR from 'swr';
import { toastError } from '../../utils/toastify';

interface ProfileIconProps {
  userId: number;
}

const ProfileIcon: FC<ProfileIconProps> = ({ userId }) => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/users/profile/image/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toastError(error.response.data.message);
    }
  };

  const { data } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/profile/image/${userId}`,
    fetcher,
  );

  useEffect(() => console.log(data), [data]);

  return (
    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-300 hover:bg-gray-400">
      <FontAwesomeIcon className="text-3xl text-grey-600" icon={faUser} />
    </div>
  );
};

export default ProfileIcon;
