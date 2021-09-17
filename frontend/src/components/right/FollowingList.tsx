import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MeContext } from '../../contexts';
import { IFollowing } from '../../interfaces';
import RightCard from './RightCard';

interface FollowingListProps {
  followingsData: IFollowing[];
}

const FollowingList: FC<FollowingListProps> = ({ followingsData }) => {
  const { me } = useContext(MeContext);
  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-3 pl-4">Following list</div>
      {followingsData?.length === 0 ? (
        <div className="flex justify-center pb-4">Not exist following list</div>
      ) : (
        followingsData?.map((v, i) => {
          if (i < 3) {
            return (
              <RightCard
                key={v.id}
                nickname={v.follower.nickname}
                introduce={v.follower.introduce}
                id={v.follower.id}
              />
            );
          }
        })
      )}
      {followingsData?.length > 3 && (
        <Link
          className="flex justify-center items-center"
          to={`/profile/${me}/following`}
        >
          <button>More</button>
        </Link>
      )}
    </div>
  );
};

export default FollowingList;
