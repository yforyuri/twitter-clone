import { ApiProperty } from '@nestjs/swagger';

export class DeleteTweetOutputDto {
  @ApiProperty({
    example: true,
    description: 'tweet delete check',
  })
  ok: boolean;
}
