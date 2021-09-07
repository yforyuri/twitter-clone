export interface ITweet {
  id: number;
  createdAt: Date;
  tweet: string;
  users: {
    id: number;
    nickname: string;
  };
}

export interface IProfile {
  id: number;
  nickname: string;
  introduce: string;
}
