import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CommentsService } from './comments.service';
import {
  CreateCommentInputDto,
  CreateCommentOutputDto,
} from './dtos/createComment.dto';
import { Request } from 'express';
import { getCommentsOutputDto } from './dtos/getComments.dto';
import { DeleteCommentOutputDto } from './dtos/deleteComment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create comments' })
  @ApiOkResponse({})
  @ApiParam({ name: 'tweetId', example: '1', description: '트윗id' })
  @UseGuards(JwtAuthGuard)
  @Post('tweets/:tweetId')
  async createComments(
    @Req() req: Request,
    @Param() param: { tweetId: string },
    @Body() createCommentInputDto: CreateCommentInputDto,
  ): Promise<CreateCommentOutputDto> {
    return await this.commentsService.createComment(
      req,
      param,
      createCommentInputDto,
    );
  }

  @ApiOperation({
    summary: 'get comments',
  })
  @ApiOkResponse({
    type: [getCommentsOutputDto],
  })
  @ApiParam({ name: 'tweetId', example: '1', description: 'tweet ID' })
  @Get('tweets/:tweetId')
  async getComments(
    @Param() param: { tweetId: string },
  ): Promise<getCommentsOutputDto[]> {
    return await this.commentsService.getComments(param);
  }

  @ApiOperation({ summary: 'Get Comments Number' })
  @ApiOkResponse({
    type: Number,
  })
  @ApiParam({ name: 'tweetId', example: '1', description: 'tweet ID' })
  @Get('count/tweets/:tweetId')
  async getCommentsCount(@Param() param: { tweetId: string }): Promise<number> {
    return await this.commentsService.getCommentsCount(param);
  }

  @ApiOperation({ summary: 'Delete Comment' })
  @ApiOkResponse({
    type: DeleteCommentOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: 'comment not exist',
  })
  @ApiResponse({
    status: 401,
    description: 'delete comment has failed',
  })
  @ApiParam({ name: 'commentId', example: '1', description: 'comment ID' })
  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  async deleteComment(
    @Req() req: Request,
    @Param() param: { commentId: string },
  ) {
    return await this.commentsService.deleteComment(req, param);
  }
}
