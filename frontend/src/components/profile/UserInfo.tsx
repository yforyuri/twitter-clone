import axios from 'axios';
import React, { FC, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MeContext } from '../../contexts';
import ProfileIcon from '../common/ProfileIcon';
import { toastError, toastSuccess } from '../../utils/toastify';
import { useGetProfileImage } from '../../hooks/useGetProfileImage';
import imageCompression from 'browser-image-compression';
import CreateProfile from './CreateProfile';
import { useGetProfile } from '../../hooks/useGetProfile';
import useSWR from 'swr';
import { IProfileInfo } from '../../interfaces';
import { fetcher } from '../../utils/fetcher';

const UserInfo: FC = () => {
  const [toggleIntroduce, setToggleIntroduce] = useState<boolean>(false);

  const { me } = useContext(MeContext);

  const { userId } = useParams<{ userId: string }>();

  const { mutate } = useGetProfileImage(+userId);

  const { data, error, mutate: profileMutate } = useGetProfile(+userId);

  const onChangeProfileUpload = async (e: any) => {
    try {
      const token = localStorage.getItem('token');

      const imageFile = e.target.files[0];
      if (!imageFile) return;

      const compressedImage = await imageCompression(imageFile, {
        maxWidthOrHeight: 288,
      });

      const blobToFile = new File([compressedImage], compressedImage.name, {
        type: compressedImage.type,
      });

      const formData = new FormData();

      formData.append('image', blobToFile);

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        mutate();
        toastSuccess('Image upload success');
      }
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const onClickToggleIntroduce = () => {
    setToggleIntroduce(true);
  };

  const { data: profileInfoData } = useSWR<IProfileInfo>(
    `${process.env.REACT_APP_BACK_URL}/users/profile/info/${userId}`,
    fetcher,
  );

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      <div className="flex border-b-1">
        <div className="mx-4 my-4">
          <ProfileIcon userId={data.id} />
          <div className="my-5 font-bold text-center">{data.nickname}</div>
          {toggleIntroduce && (
            <div className="relative rounded-full px-2 py-1 font-black border-purple-500 border-1 text-purple-500 text-xs mt-2 text-center">
              <input
                className="w-full opacity-0 absolute"
                type="file"
                onChange={onChangeProfileUpload}
              />
              <span>change</span>
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="flex justify-around w-full text-center mt-4 mb-2">
            <div>
              <div>Following</div>
              <div>{profileInfoData?.followings.length}</div>
            </div>
            <Link
              className="hover:text-purple-500"
              to={`/profile/${userId}/followers`}
            >
              <div>Follower</div>
              <div>{profileInfoData?.followers.length}</div>
            </Link>
            <Link className="hover:text-purple-500" to={`/profile/${userId}`}>
              <div>Tweet</div>
              <div>{profileInfoData?.tweets.length}</div>
            </Link>
          </div>
          <div className="ml-7 mt-5">
            {toggleIntroduce ? (
              <CreateProfile
                profileMutate={profileMutate}
                setToggleIntroduce={setToggleIntroduce}
              />
            ) : data.introduce ? (
              <div>{data.introduce}</div>
            ) : (
              <div>no introduce message </div>
            )}
          </div>
          <div className="mx-5 mt-1 mb-5 justify-end items-end flex">
            {me === data.id && (
              <button
                onClick={onClickToggleIntroduce}
                className="rounded-full px-2 py-1 font-black border-purple-500 border-1 text-purple-500 text-xs mx-2 text-center"
              >
                edit profile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
