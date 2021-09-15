import axios from 'axios';
import React, { createRef, FC, useEffect, useRef } from 'react';
import { useSWRInfinite } from 'swr';
import Header from '../components/common/Header';
import { ITweet } from '../interfaces';
import Cards from '../components/common/card/Cards';
import UserInfo from '../components/profile/UserInfo';
import { useParams } from 'react-router';

const getKey =
  (userId: string) => (pageIndex: number, previusPageData: any) => {
    if (previusPageData && !previusPageData.length) return null;
    return `${process.env.REACT_APP_BACK_URL}/tweets/${userId}?page=${pageIndex}`;
  };

const Profile: FC = () => {
  const lastEl = createRef<HTMLDivElement>();
  const intersectionObserver = useRef<IntersectionObserver>();
  const sizeRef = useRef<number>(1);
  const { userId } = useParams<{ userId: string }>();

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data, error, mutate, size, setSize } = useSWRInfinite<ITweet[]>(
    getKey(userId),
    fetcher,
  );

  // const onClickMore = () => {
  //   setSize(size + 1);
  // };

  useEffect(() => {
    // console.log(data, size), [data];
    if (data && !data[size - 1]) return;
    if (!intersectionObserver.current && lastEl.current) {
      intersectionObserver.current = new IntersectionObserver(
        async (entries) => {
          if (!entries[0].isIntersecting) return;

          sizeRef.current += 1;

          await setSize(sizeRef.current);
        },
      );
      intersectionObserver.current?.observe(lastEl.current);
    }
  }, [lastEl]);

  if (!data) return <div>loading...</div>;
  if (error) return <div>errer</div>;

  return (
    <>
      <Header title="Profile" />
      <UserInfo />
      {data.map((tweets, i) => {
        return <Cards key={i} tweets={tweets} mutate={mutate} />;
      })}
      <div ref={lastEl} className="text-white">
        scrolling
      </div>
    </>
  );
};

export default Profile;
