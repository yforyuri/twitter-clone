import { FC } from 'react';
import { IFollower } from '../../interfaces';
import ProfileIcon from '../common/ProfileIcon';

interface FollowCardProps {
  follower: IFollower;
}

const FollowerCard: FC<FollowCardProps> = ({ follower }) => {
  return (
    <li>
      <ProfileIcon userId={follower.following.id} />
      <div>
        <div>{follower.following.nickname}</div>
        <div>
          {follower.following.introduce
            ? follower.following.introduce
            : 'no introduce'}
        </div>
      </div>
    </li>
  );
};

export default FollowerCard;
