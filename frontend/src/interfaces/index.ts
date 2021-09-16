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

export interface IFollower {
  id: number;
  following: {
    id: number;
    nickname: string;
    introduce: string;
  };
}

export interface IFollowing {
  id: number;
  follower: {
    id: number;
    nickname: string;
    introduce: string;
  };
}

export interface IProfileInfo {
  id: number;
  nickname: string;
  introduce: string;
  followers: {
    id: number;
  }[];
  followings: {
    id: number;
  }[];
  tweets: {
    id: number;
  }[];
}

export interface IFollowList {
  id: number;
  follower: {
    id: number;
  };
  following: {
    id: number;
  };
}
