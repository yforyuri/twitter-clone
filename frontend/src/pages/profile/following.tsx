import React, { createRef, FC } from 'react';
import useSWR from 'swr';
import Header from '../../components/common/Header';
import UserInfo from '../../components/profile/UserInfo';
import { useParams } from 'react-router';
import { fetcher } from '../../utils/fetcher';
import { IFollowing } from '../../interfaces';
import FollowingCard from '../../components/profile/FollowingCard';

const Following: FC = () => {
  const lastEl = createRef<HTMLDivElement>();
  const { userId } = useParams<{ userId: string }>();

  const { data } = useSWR<IFollowing[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followings/${userId}`,
    fetcher,
  );

  // useEffect(() => console.log(data), [data]);

  return (
    <>
      <Header title={'Following'} />
      <UserInfo />
      {data?.map((following, i) => {
        return <FollowingCard key={i} following={following} />;
      })}
      <div ref={lastEl} className="text-white">
        scrolling
      </div>
    </>
  );
};

export default Following;
