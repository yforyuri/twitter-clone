import { Common } from 'src/common/common.entity';
import { Likes } from 'src/likes/entities/likes.entity';
import { Tweets } from 'src/tweets/entities/tweets.entity';

import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Users extends Common {
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { select: false })
  nickname: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Tweets, (tweets) => tweets.users)
  tweets: Tweets[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];
}
