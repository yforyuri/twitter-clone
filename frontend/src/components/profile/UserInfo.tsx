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
        <div>
          <ProfileIcon userId={data.id} />
          <div>{data.nickname}</div>
          {me === data.id && (
            <div className="relative rounded-full px-2 py-1 font-black text-white text-xs bg-purple-500 mx-2 mt-1 text-center">
              <input
                className="w-full opacity-0 absolute"
                type="file"
                onChange={onChangeProfileUpload}
              />
              <span>img upload</span>
            </div>
          )}
        </div>
        <div className="flex justify-around w-full text-center">
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
      </div>
      {toggleIntroduce ? (
        <CreateProfile
          profileMutate={profileMutate}
          setToggleIntroduce={setToggleIntroduce}
        />
      ) : data.introduce ? (
        <div>
          {data.introduce}
          {me === data.id && (
            <button
              onClick={onClickToggleIntroduce}
              className="rounded-full px-2 py-1 font-black text-white text-xs bg-purple-500 mx-2 mt-1 text-center"
            >
              edit profile
            </button>
          )}
        </div>
      ) : me === data.id ? (
        <CreateProfile profileMutate={profileMutate} />
      ) : (
        <div>no introduce message </div>
      )}
    </>
  );
};

export default UserInfo;
