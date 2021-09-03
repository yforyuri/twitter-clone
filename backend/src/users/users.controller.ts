import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUSerDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AnyFilesInterceptor, MulterModule } from '@nestjs/platform-express';

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request): Promise<number> {
    return this.usersServise.getMe(req);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async profileImage(
    @Req() req: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.usersServise.profileImage(req, files);
  }

  @Get('profile/image/:userId')
  async getProfileImage(@Param() param: { userId: string }) {
    return await this.usersServise.getProfileImage(param);
  }
}
