import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Profiles } from './entities/profiles.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Profiles]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        limits: {
          fileSize: 1024 * 1024 * 1,
        },
        fileFilter: (req, file, callback) => {
          if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) callback(null, true);
          else
            callback(
              new HttpException('Not Image', HttpStatus.BAD_REQUEST),
              false,
            );
        },
        storage: diskStorage({
          destination: configService.get('MULTER_DEST'),
          filename: (req, file, callback) => {
            callback(null, `${uuid()}${extname(file.originalname)}`);
          },
        }),
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
