import axios from 'axios';
import React, { createRef, FC, useEffect, useRef } from 'react';
import { useSWRInfinite } from 'swr';
import Header from '../components/common/Header';
import { ITweet } from '../interfaces';
import CreateTweet from '../components/main/CreateTweet';
import Cards from '../components/common/card/Cards';

const getKey = (pageIndex: number, previusPageData: any) => {
  if (previusPageData && !previusPageData.length) return null;
  return `${process.env.REACT_APP_BACK_URL}/tweets?page=${pageIndex}`;
};

const Main: FC = () => {
  const lastEl = createRef<HTMLDivElement>();
  const intersectionObserver = useRef<IntersectionObserver>();
  const sizeRef = useRef<number>(1);

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data, error, mutate, size, setSize } = useSWRInfinite<ITweet[]>(
    getKey,
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
      <Header title="Home" />
      <CreateTweet mutate={mutate} />
      {data.map((tweets, i) => {
        return <Cards key={i} tweets={tweets} mutate={mutate} />;
      })}
      <div ref={lastEl} className="text-white">
        scrolling
      </div>
    </>
  );
};

export default Main;
