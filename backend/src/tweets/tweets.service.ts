import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Tweets } from './entities/tweets.entity';
import { Request } from 'express';
import { Likes } from 'src/likes/entities/likes.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweets)
    private readonly tweetsRepository: Repository<Tweets>,
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
  ) {}

  async createTweet(req: Request, createTweetDto) {
    console.log(req.user);

    return await this.tweetsRepository.save({
      ...createTweetDto,
      users: req.user,
    });
  }

  async getTweets(query) {
    return await this.tweetsRepository
      .createQueryBuilder('tweets')
      .leftJoin('tweets.users', 'users')
      .select([
        'tweets.id',
        'tweets.tweet',
        'tweets.createdAt',
        'users.id',
        'users.nickname',
      ])
      .orderBy('tweets.createdAt', 'DESC')
      .take(10)
      .skip(query.page ? query.page * 10 : 0)
      .getMany();
  }

  async deleteTweet(req: Request, param: { tweetId: string }) {
    const tweet = await this.tweetsRepository.findOne({
      where: {
        id: param.tweetId,
        users: req.user,
      },
    });

    if (!tweet)
      throw new HttpException(
        '인증되지 않는 사용자입니다',
        HttpStatus.UNAUTHORIZED,
      );

    const likes = await this.likesRepository.find({
      where: {
        tweet: {
          id: tweet.id,
        },
      },
    });

    if (Like.length !== 0) {
      await Promise.all(
        likes.map((like) => {
          this.likesRepository.softDelete({ id: like.id });
        }),
      );
    }

    return await this.tweetsRepository.softDelete({ id: +param.tweetId });
  }
}
