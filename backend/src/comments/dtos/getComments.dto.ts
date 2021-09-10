import { PickType } from '@nestjs/swagger';
import { Comments } from '../entities/comments.entity';

export class getCommentsOutputDto extends PickType(Comments, [
  'id',
  'createdAt',
  'comment',
  'user',
] as const) {}
