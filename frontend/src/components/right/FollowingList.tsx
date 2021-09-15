import { FC } from 'react';
import { IFollowing } from '../../interfaces';
import RightCard from './RightCard';

interface FollowingListProps {
  followingsData: IFollowing[];
}

const FollowingList: FC<FollowingListProps> = ({ followingsData }) => {
  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-8 pl-4">Following list</div>
      {followingsData?.length === 0 ? (
        <div className="flex justify-center pb-4">Not exist following list</div>
      ) : (
        followingsData?.map((v) => {
          return (
            <RightCard
              key={v.id}
              nickname={v.follower.nickname}
              introduce={v.follower.introduce}
              id={v.follower.id}
            />
          );
        })
      )}
    </div>
  );
};

export default FollowingList;
