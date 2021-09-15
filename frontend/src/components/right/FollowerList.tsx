import { FC } from 'react';
import { IFollower } from '../../interfaces';
import RightCard from './RightCard';

interface FollowerListProps {
  followersData: IFollower[];
}

const FollowerList: FC<FollowerListProps> = ({ followersData }) => {
  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-8 pl-4">Follower list</div>
      {followersData?.length === 0 ? (
        <div className="flex justify-center pb-4">Not exist follower list</div>
      ) : (
        followersData?.map((v) => {
          return (
            <RightCard
              key={v.id}
              nickname={v.following.nickname}
              introduce={v.following.introduce}
              id={v.following.id}
            />
          );
        })
      )}
    </div>
  );
};

export default FollowerList;
