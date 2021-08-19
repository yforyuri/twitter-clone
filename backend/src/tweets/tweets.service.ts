import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweets } from './entities/tweets.entity';
import { Request } from 'express';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweets)
    private readonly tweetsRepository: Repository<Tweets>,
  ) {}

  async createTweet(req: Request, createTweetDto) {
    console.log(req.user);

    return await this.tweetsRepository.save({
      ...createTweetDto,
      users: req.user,
    });
  }
}
