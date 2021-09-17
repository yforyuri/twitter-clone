import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MeContext } from '../../contexts';
import { IFollower } from '../../interfaces';
import RightCard from './RightCard';

interface FollowerListProps {
  followersData: IFollower[];
}

const FollowerList: FC<FollowerListProps> = ({ followersData }) => {
  const { me } = useContext(MeContext);
  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-3 pl-4">Follower list</div>
      {followersData?.length === 0 ? (
        <div className="flex justify-center pb-4">Not exist follower list</div>
      ) : (
        followersData?.map((v, i) => {
          if (i < 3) {
            return (
              <RightCard
                key={v.id}
                nickname={v.following.nickname}
                introduce={v.following.introduce}
                id={v.following.id}
              />
            );
          }
        })
      )}
      {followersData?.length >= 3 && (
        <Link to={`/profile/${me}/follower`}>
          <button>More</button>
        </Link>
      )}
    </div>
  );
};

export default FollowerList;
