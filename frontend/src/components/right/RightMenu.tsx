import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';
import RightCard from './RightCard';

const RightMenu: FC = () => {
  return (
    <div className="flex-auto">
      <div>
        <form className="relative">
          <FontAwesomeIcon className="absolute top-4 left-4" icon={faSearch} />
          <input className="border-1 border-white rounded-full px-12 py-3 focus:outline-none focus:border-purple-500 bg-gray-100 focus:bg-white" />
        </form>
      </div>
      <RightCard />
      <RightCard />
      <RightCard />
      <RightCard />
      <RightCard />
    </div>
  );
};

export default RightMenu;
