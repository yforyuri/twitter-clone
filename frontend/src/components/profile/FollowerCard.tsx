import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IFollower } from '../../interfaces';
import ProfileIcon from '../common/ProfileIcon';

interface FollowerCardProps {
  follower: IFollower;
}

const FollowerCard: FC<FollowerCardProps> = ({ follower }) => {
  return (
    <Link to={`/profile/${follower.following.id}`}>
      <li className="flex border-b-1">
        <div className="flex m-4">
          <ProfileIcon userId={follower.following.id} />
          <div className="mt-1 ml-3 text-sm w-full">
            <div className="font-bold">{follower.following.nickname}</div>
            <div>
              {follower.following.introduce
                ? follower.following.introduce
                : 'no introduce'}
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default FollowerCard;
