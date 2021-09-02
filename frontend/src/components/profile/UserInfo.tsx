import axios from 'axios';
import React, { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MeContext } from '../../contexts';
import ProfileIcon from '../common/ProfileIcon';

const UserInfo: FC = () => {
  const { me } = useContext(MeContext);

  const { userId }: { userId: string } = useParams();

  const onChangeProfileupload = async (e: any) => {
    try {
      const token = localStorage.getItem('token');
      const imageFile = e.target.files[0];
      const formData = new FormData();

      if (!imageFile) return;

      formData.append('image', imageFile);

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
        <ProfileIcon />
        <div>nickname</div>
        {me === +userId && (
          <div>
            <input type="file" onChange={onChangeProfileupload} />
          </div>
        )}
      </div>
      <div className="flex justify-around text-center w-full">
        <div>
          <div>Followers</div>
          <div>123</div>
        </div>
        <div>
          <div>Followings</div>
          <div>123</div>
        </div>
        <div>
          <div>Tweets</div>
          <div>123</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
