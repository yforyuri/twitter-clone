import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { FC, useEffect } from 'react';
import useSWR from 'swr';
import { useGetProfileImage } from '../../hooks/useGetProfileImage';
import { toastError } from '../../utils/toastify';

interface ProfileIconProps {
  userId: number;
}

const ProfileIcon: FC<ProfileIconProps> = ({ userId }) => {
  const { data } = useGetProfileImage(userId);

  useEffect(() => console.log(data), [data]);

  return (
    <>
      {data && data.profiles.length !== 0 ? (
        <div className="h-12 w-12 ">
          <img
            className="object-cover rounded-full h-12 w-12"
            src={`${process.env.REACT_APP_BACK_URL}/uploads/${data.profiles[0].filename}`}
          />
        </div>
      ) : (
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-300 hover:bg-gray-400">
          <FontAwesomeIcon className="text-3xl text-gray-600" icon={faUser} />
        </div>
      )}
    </>
  );
};

export default ProfileIcon;
