import { IsNotEmpty, IsString } from 'class-validator';

export class createTweetDto {
  @IsString()
  @IsNotEmpty()
  tweet: string;
}
