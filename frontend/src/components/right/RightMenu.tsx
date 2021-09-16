import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { FC, useContext } from 'react';
import { useFollowers, useFollowings } from '../../hooks/useFollow';
import { MeContext } from '../../contexts';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

const RightMenu: FC = () => {
  const { me } = useContext(MeContext);

  const { data: followersData } = useFollowers(me);
  const { data: followingsData } = useFollowings(me);

  return (
    <div className="flex-auto mt-2 md:ml-5">
      <div>
        <form className="relative">
          <FontAwesomeIcon className="absolute top-4 left-4" icon={faSearch} />
          <input className="border-1 border-white rounded-full px-12 py-3 focus:outline-none focus:border-purple-500 bg-gray-100 focus:bg-white" />
        </form>
      </div>
      <div className="mt-4">
        <FollowerList followersData={followersData} />
      </div>
      <div className="mt-4">
        <FollowingList followingsData={followingsData} />
      </div>
    </div>
  );
};

export default RightMenu;
