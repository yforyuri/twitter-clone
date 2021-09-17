import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IFollowing } from '../../interfaces';
import ProfileIcon from '../common/ProfileIcon';

interface FollowingCardProps {
  following: IFollowing;
}

const FollowingCard: FC<FollowingCardProps> = ({ following }) => {
  return (
    <Link to={`/profile/${following.follower.id}`}>
      <li className="flex border-b-1">
        <div className="flex m-4">
          <ProfileIcon userId={following.follower.id} />
          <div className="mt-1 ml-3 text-sm w-full">
            <div className="font-bold">{following.follower.nickname}</div>
            <div>
              {following.follower.introduce
                ? following.follower.introduce
                : 'no introduce'}
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default FollowingCard;
