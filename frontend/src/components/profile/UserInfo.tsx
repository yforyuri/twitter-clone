import axios from 'axios';
import React, { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MeContext } from '../../contexts';
import ProfileIcon from '../common/ProfileIcon';
import { toastError, toastSuccess } from '../../utils/toastify';
import { useGetProfileImage } from '../../hooks/useGetProfileImage';
import imageCompression from 'browser-image-compression';

const UserInfo: FC = () => {
  const { me } = useContext(MeContext);

  const { userId }: { userId: string } = useParams();

  const { mutate } = useGetProfileImage(+userId);

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
    } catch (error) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };
  return (
    <div className="flex border-b-1">
      <div>
        <ProfileIcon userId={+userId} />
        <div>nickname</div>
        {me === +userId && (
          <div className="relative rounded-full px-2 py-1 font-black text-purple-500 text-xs mx-2 mt-1 text-center">
            <input
              className="w-full opacity-0 absolute"
              type="file"
              onChange={onChangeProfileUpload}
            />
            <span>upload image</span>
          </div>
        )}
      </div>
      <div className="flex justify-around w-full text-center">
        <div>
          <div>Follower</div>
          <div>123</div>
        </div>
        <div>
          <div>Following</div>
          <div>123</div>
        </div>
        <div>
          <div>Tweet</div>
          <div>123</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
