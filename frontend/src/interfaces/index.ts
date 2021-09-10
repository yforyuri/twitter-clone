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

export interface IComment {
  id: number;
  createdAt: Date;
  comment: string;
  user: {
    id: number;
    nickname: string;
  };
}
