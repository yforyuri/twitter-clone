import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LikesService } from './likes.service';
import { Request } from 'express';
import { LikeTweetOutputDto } from './dtos/likeTweet.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetIsTweetLikeOutputDto } from './dtos/getTweetIsLike.dto';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: 'likes function' })
  @ApiParam({
    name: 'tweetId',
    example: 'http://localhost:3010/likes/tweets/10',
    description: 'tweet id',
  })
  @ApiOkResponse({
    type: LikeTweetOutputDto,
    description: 'like tweet success',
  })
  @UseGuards(JwtAuthGuard)
  @Put('tweets/:tweetId')
  async likeTweet(
    @Req() req: Request,
    @Param() param: { tweetId: string },
  ): Promise<LikeTweetOutputDto> {
    return await this.likesService.likeTweet(req, param);
  }

  @ApiOperation({ summary: 'count likes' })
  @ApiParam({
    name: 'tweetId',
    example: 'http://localhost:3010/like/count/tweets/10',
    description: 'tweet id',
  })
  @ApiOkResponse({
    type: Number,
    description: 'count likes',
  })
  @Get('count/tweets/:tweetId')
  async getTweetLikeCount(
    @Param() param: { tweetId: string },
  ): Promise<number> {
    return await this.likesService.getTweetLikesCount(param);
  }

  @ApiOperation({ summary: 'check likes' })
  @ApiParam({
    name: 'tweetId',
    example: 'http://localhost:3010/like/islike/tweets/10',
    description: 'tweet id',
  })
  @ApiOkResponse({
    type: GetIsTweetLikeOutputDto,
    description: 'check likes',
  })
  @UseGuards(JwtAuthGuard)
  @Get('islike/tweets/:tweetId')
  async getTweetIsLike(
    @Req() req: Request,
    @Param() param: { tweetId: string },
  ): Promise<GetIsTweetLikeOutputDto> {
    return await this.likesService.getTweetIsLike(req, param);
  }
}
