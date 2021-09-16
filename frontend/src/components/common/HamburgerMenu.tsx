import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import useSWR from 'swr';
import { MeContext } from '../../contexts';
import { useGetProfile } from '../../hooks/useGetProfile';
import { IProfileInfo } from '../../interfaces';
import { fetcher } from '../../utils/fetcher';
import MenuList from './MenuList';
import ProfileIcon from './ProfileIcon';

interface HamburgerMenuProps {
  title: string;
  setHamburgerToggle: Dispatch<SetStateAction<boolean>>;
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({
  title,
  setHamburgerToggle,
}) => {
  const { me } = useContext(MeContext);

  const { data } = useGetProfile(me);

  const { data: profileInfoData } = useSWR<IProfileInfo>(
    `${process.env.REACT_APP_BACK_URL}/users/profile/info/${me}`,
    fetcher,
  );

  const onClickHamburgerToggle = () => {
    setHamburgerToggle(false);
  };
  return (
    <div className="fixed top-0 w-full min-h-screen bg-black bg-opacity-50 z-10">
      <div className="w-5/6 bg-white min-h-screen px-4">
        <div className="flex justify-between pt-4 mb-4">
          <div className="font-black">{title}</div>
          <button onClick={onClickHamburgerToggle}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="flex items-center mb-4">
          <ProfileIcon userId={me} />
          <div className="ml-4 font-bold">{data?.nickname}</div>
        </div>
        <div className="flex">
          <div className="w-24">Following</div>
          <div className="ml-4">{profileInfoData?.followings.length}</div>
        </div>
        <div className="flex">
          <div className="w-24">Follower</div>
          <div className="ml-4">{profileInfoData?.followers.length}</div>
        </div>
        <MenuList />
      </div>
    </div>
  );
};

export default HamburgerMenu;
