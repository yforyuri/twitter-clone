import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { createTweetDto } from './dtos/createTweet.dto';
import { TweetsService } from './tweets.service';
import { Request } from 'express';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTweet(
    @Req() req: Request,
    @Body() createTweetDto: createTweetDto,
  ) {
    return await this.tweetService.createTweet(req, createTweetDto);
  }

  @Get()
  async getTweets(@Query() query: { page: string }) {
    return await this.tweetService.getTweets(query);
  }
}
