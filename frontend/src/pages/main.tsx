import axios from 'axios';
import React, { FC, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import Header from '../components/common/Header';
import { ITweet } from '../interfaces';
import CreateTweet from '../components/main/CreateTweet';
import Cards from '../components/common/card/Cards';

const Main: FC = () => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data, error, mutate } = useSWR<ITweet[]>(
    `${process.env.REACT_APP_BACK_URL}/tweets`,
    fetcher,
  );

  // useEffect(() => console.log(data), [data]);

  if (!data) return <div>loading...</div>;
  if (error) return <div>errer</div>;

  return (
    <>
      <Header title={'Home'} />
      <CreateTweet mutate={mutate} />
      <Cards tweets={data} mutate={mutate}></Cards>
    </>
  );
};

export default Main;
