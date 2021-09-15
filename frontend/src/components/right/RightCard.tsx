import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../common/ProfileIcon';

interface RightCardProps {
  id: number;
  nickname: string;
  introduce: string;
}

const RightCard: FC<RightCardProps> = ({ id, nickname, introduce }) => {
  return (
    <div className="w-80">
      <Link className="flex px-4 py-2 hover:bg-gray-300" to={`/profile/${id}`}>
        <ProfileIcon userId={1} />
        <div className="flex items-center justify-between w-full ml-2">
          <div>
            <div>{nickname}</div>
            <div>{introduce}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RightCard;
