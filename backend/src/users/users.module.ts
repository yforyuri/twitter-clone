import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Profiles } from './entities/profiles.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { config } from 'dotenv';

config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
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
        storage: multerS3({
          s3,
          bucket:
            configService.get<string>('AWS_S3_BUCKET_NAME') +
            '/profile-yforyuri',
          key: (req, file, callback) => {
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
