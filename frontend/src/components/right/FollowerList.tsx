import { FC } from 'react';
import { IFollower } from '../../interfaces';
import RightCard from './RightCard';

interface FollowerListProps {
  followersData: IFollower[];
}

const FollowerList: FC<FollowerListProps> = ({ followersData }) => {
  return (
    <>
      {followersData &&
        followersData.map((v) => {
          return (
            <RightCard
              key={v.id}
              nickname={v.follower.nickname}
              introduce={v.follower.introduce}
            />
          );
        })}
    </>
  );
};

export default FollowerList;
