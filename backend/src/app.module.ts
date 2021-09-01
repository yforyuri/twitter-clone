import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { Tweets } from './tweets/entities/tweets.entity';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { Likes } from './likes/entities/likes.entity';
import { Profiles } from './users/entities/profiles.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.NODE_ENV === 'production'
        ? {
            url: process.env.DATABASE_URL,
            extra: { ssl: { rejectUnauthorized: false } },
          }
        : {
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
          }),
      entities: [Users, Tweets, Likes, Profiles],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    TweetsModule,
    AuthModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
