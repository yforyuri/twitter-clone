import React, { createRef, FC, useEffect } from 'react';
import useSWR from 'swr';
import Header from '../../components/common/Header';
import UserInfo from '../../components/profile/UserInfo';
import { useParams } from 'react-router';
import { fetcher } from '../../utils/fetcher';
import FollowerCard from '../../components/profile/FollowerCard';
import { IFollower } from '../../interfaces';

const Follower: FC = () => {
  const lastEl = createRef<HTMLDivElement>();
  const { userId } = useParams<{ userId: string }>();

  const { data } = useSWR<IFollower[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followers/${userId}`,
    fetcher,
  );

  useEffect(() => console.log(data), [data]);

  return (
    <>
      <Header title={'Follower'} />
      <UserInfo />
      {data?.map((follower, i) => {
        return <FollowerCard key={i} follower={follower} />;
      })}
      <div ref={lastEl} className="text-white">
        scrolling
      </div>
    </>
  );
};

export default Follower;
