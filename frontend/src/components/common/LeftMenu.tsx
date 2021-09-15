import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import MenuList from './MenuList';

const LeftMenu: FC = () => {
  return (
    <div className="flex-auto mt-2 md:mr-5 md:ml-20 ">
      <div>
        <div className="md:px-6 md:py-3">
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-3xl text-purple-400"
          />
        </div>
        <MenuList />
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-black text-lg px-24 py-4 rounded-full mt-8">
          Tweet
        </button>
      </div>
    </div>
  );
};

export default LeftMenu;
