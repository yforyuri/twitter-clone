import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CommentsService } from './comments.service';
import {
  CreateCommentInputDto,
  CreateCommentOutputDto,
} from './dtos/createComment.dto';
import { Request } from 'express';

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
}
