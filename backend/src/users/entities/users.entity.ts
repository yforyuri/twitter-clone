import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Comments } from 'src/comments/entities/comments.entity';
import { Common } from 'src/common/common.entity';
import { Likes } from 'src/likes/entities/likes.entity';
import { Tweets } from 'src/tweets/entities/tweets.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Follows } from './follows.entity';
import { Profiles } from './profiles.entity';

@Entity()
export class Users extends Common {
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  nickname: string;

  @Column('varchar', { select: false })
  password: string;

  @ApiProperty({
    example: 'Hello!',
    description: 'introdue comment',
  })
  @IsNotEmpty()
  @Column('varchar', { default: null })
  introduce: string;

  @OneToMany(() => Tweets, (tweets) => tweets.users)
  tweets: Tweets[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];

  @OneToMany(() => Profiles, (profiles) => profiles.user)
  profiles: Profiles[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => Follows, (follow) => follow.follower)
  followers: Follows[];

  @OneToMany(() => Follows, (follow) => follow.following)
  followings: Follows[];
}
