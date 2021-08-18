import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUSerDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
