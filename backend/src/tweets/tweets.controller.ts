import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { createTweetDto } from './dtos/createTweet.dto';
import { TweetsService } from './tweets.service';
import { Request } from 'express';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteTweetOutputDto } from './dtos/deleteTweet.dto';
import { Tweets } from './entities/tweets.entity';

@ApiTags('tweets')
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

  @Get(':userId')
  async getProfileTweets(
    @Query() query,
    @Param() param: { userId: string },
  ): Promise<Tweets[]> {
    return await this.tweetService.getProfileTweets(query, param);
  }

  @ApiOperation({ summary: 'delete function' })
  @ApiParam({
    name: 'tweetId',
    example: 'http://localhost:3010/tweets/10',
    description: 'tweet id',
  })
  @ApiOkResponse({
    type: DeleteTweetOutputDto,
    description: 'delete tweet success',
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자입니다.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':tweetId')
  async deleteTweet(
    @Req() req: Request,
    @Param() param: { tweetId: string },
  ): Promise<DeleteTweetOutputDto> {
    return await this.tweetService.deleteTweet(req, param);
  }
}
