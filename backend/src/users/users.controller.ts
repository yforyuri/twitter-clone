import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUSerDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ModifyIntroduceInputDto,
  ModifyIntroduceOutputDto,
} from './dtos/modifyIntroduce.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
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
    @UploadedFiles() files: Array<Express.MulterS3.File>,
  ) {
    return await this.usersServise.profileImage(req, files);
  }

  @Get('profile/image/:userId')
  async getProfileImage(@Param() param: { userId: string }) {
    return await this.usersServise.getProfileImage(param);
  }

  @ApiOperation({ summary: 'modify info' })
  @ApiOkResponse({ type: ModifyIntroduceOutputDto })
  @UseGuards(JwtAuthGuard)
  @Put('introduce')
  async modifyIntroduce(
    @Req() req: Request,
    @Body() modifyIntroduceInputDto: ModifyIntroduceInputDto,
  ): Promise<ModifyIntroduceOutputDto> {
    return await this.usersServise.modifyIntroduce(
      req,
      modifyIntroduceInputDto,
    );
  }

  @Get('profile/:userId')
  async getProfile(@Param() param: { userId: string }) {
    return await this.usersServise.getProfile(param);
  }

  @ApiOperation({ summary: '팔로우 신청 취소' })
  @ApiOkResponse({})
  @UseGuards(JwtAuthGuard)
  @Post('follow/:userId')
  async follow(@Req() req: Request, @Param() param: { userId: string }) {
    return await this.usersServise.follow(req, param);
  }
}
