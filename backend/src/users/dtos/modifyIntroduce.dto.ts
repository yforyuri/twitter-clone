import { PickType } from '@nestjs/swagger';
import { Users } from '../entities/user.entity';

export class ModifyIntroduceInputDto extends PickType(Users, [
  'introduce',
] as const) {}

export class ModifyIntroduceOutputDto extends Users {}
