import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentOutputDto {
  @ApiProperty({
    example: true,
    description: 'check delete comment',
  })
  ok: boolean;
}
