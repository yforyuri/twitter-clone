import { Body, Controller, Post } from '@nestjs/common';
import { CreateUSerDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServise: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUSerDto) {
    return await this.usersServise.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersServise.login(loginDto);
  }
}
