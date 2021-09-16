import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUSerDto } from './dtos/createUser.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Profiles } from './entities/profiles.entity';
import {
  ModifyIntroduceInputDto,
  ModifyIntroduceOutputDto,
} from './dtos/modifyIntroduce.dto';
import { Follows } from './entities/follows.entity';
import { AuthService } from 'src/auth/auth.service';
import { GetFollowsOutputDto } from './dtos/getFollows.dto';
import { FollowOutputDto } from './dtos/follow.dto';
import { GetProfileInfoOutputDto } from './dtos/getProfileInfo.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Profiles)
    private readonly profilesRepository: Repository<Profiles>,
    @InjectRepository(Follows)
    private readonly followsRepository: Repository<Follows>,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUSerDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const verifyCode: number =
      Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;

    const user = await this.usersRepository.save({
      email: createUserDto.email,
      nickname: createUserDto.nickname,
      password: hashedPassword,
      verifyCode: verifyCode.toString(),
    });

    await this.authService.sendVerifyEmail(user);

    return { email: user.email, nickname: user.nickname };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: loginDto.email,
      },
      select: [`id`, `password`],
    });

    if (!user)
      throw new HttpException(
        '존재하지 않는 유저입니다.',
        HttpStatus.UNAUTHORIZED,
      );

    const checkPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!checkPassword) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async getMe(req: Request): Promise<number> {
    return +req.user;
  }

  async profileImage(req: Request, files: Array<Express.MulterS3.File>) {
    const existProfiles = await this.profilesRepository.findOne({
      where: {
        user: req.user,
      },
    });

    if (existProfiles) {
      // upload folder에 올라가는 경우
      // unlink node로 file 삭제할 때
      // const fileUnlink = promisify(unlink);
      // await fileUnlink(`./uploads/${existProfiles.filename}`);

      await this.profilesRepository.delete({ id: existProfiles.id });
    }

    const profile = await this.profilesRepository.create({
      filename: files[0].key,
      originalFilename: files[0].originalname,
      user: req.user,
    });

    return await this.profilesRepository.save(profile);
  }

  async getProfileImage(param: { userId: string }) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .leftJoin('users.profiles', 'profiles')
      .where('users.id = :userId', { userId: param.userId })
      .select(['users.id', 'profiles.id', 'profiles.filename'])
      .getOne();

    return user;
  }

  async modifyIntroduce(
    req: Request,
    modifyIntroduceInputDto: ModifyIntroduceInputDto,
  ): Promise<ModifyIntroduceOutputDto> {
    const user = await this.usersRepository.findOne({
      where: {
        id: req.user,
      },
    });

    user.introduce = modifyIntroduceInputDto.introduce;

    return await this.usersRepository.save(user);
  }

  async getProfile(param: { userId }) {
    const user = await this.usersRepository.findOne({
      where: {
        id: param.userId,
      },
    });
    if (!user)
      throw new HttpException('Not exist user', HttpStatus.BAD_REQUEST);

    return user;
  }

  async follow(
    req: Request,
    param: { userId: string },
  ): Promise<FollowOutputDto> {
    const user = await this.usersRepository.findOne({
      where: {
        id: param.userId,
      },
    });

    if (!user)
      throw new HttpException('not exist user', HttpStatus.BAD_REQUEST);
    if (req.user === user.id)
      throw new HttpException(
        'you can not follow yourself',
        HttpStatus.UNAUTHORIZED,
      );

    const existFollow = await this.followsRepository.findOne({
      where: {
        follower: user,
        following: req.user,
      },
    });

    if (existFollow) {
      await this.followsRepository.delete({ id: existFollow.id });
      return { isFollow: 'unFollow' };
    }

    const follow = await this.followsRepository.create({
      follower: user,
      following: req.user,
    });

    await this.followsRepository.save(follow);

    return { isFollow: 'follow' };
  }

  async getFollows(req: Request): Promise<GetFollowsOutputDto[]> {
    const follows = await this.followsRepository
      .createQueryBuilder('follows')
      .leftJoin('follows.follower', 'follower')
      .leftJoin('follows.following', 'following')
      .where('following.id = :followingId', { followingId: req.user })
      .select(['follows.id', 'follower.id', 'following.id'])
      .getMany();

    return follows;
  }

  async getFollowers(param: { userId: string }) {
    return await this.followsRepository
      .createQueryBuilder('follows')
      .leftJoin('follows.following', 'following')
      .leftJoin('follows.follower', 'follower')
      .where('follower.id = :followerId', { followerId: param.userId })
      .select([
        'follows.id',
        'following.id',
        'following.nickname',
        'following.introduce',
      ])
      .orderBy('follows.createdAt', 'ASC')
      .getMany();
  }

  async getFollowings(param: { userId: string }) {
    return await this.followsRepository
      .createQueryBuilder('follows')
      .leftJoin('follows.following', 'following')
      .leftJoin('follows.follower', 'follower')
      .where('following.id = :followingId', { followingId: param.userId })
      .select([
        'follows.id',
        'follower.id',
        'follower.nickname',
        'follower.introduce',
      ])
      .orderBy('follows.createdAt', 'ASC')
      .getMany();
  }

  async getProfileInfo(param: {
    userId: string;
  }): Promise<GetProfileInfoOutputDto> {
    return await this.usersRepository
      .createQueryBuilder('users')
      .leftJoin('users.followers', 'followers')
      .leftJoin('users.followings', 'followings')
      .leftJoin('users.tweets', 'tweets')
      .where('users.id = :userId', { userId: param.userId })
      .select([
        'users.id',
        'users.nickname',
        'users.introduce',
        'followers.id',
        'followings.id',
        'tweets.id',
      ])
      .getOne();
  }

  async isFollow(req: Request, param: { userId: string }) {
    const isFollow = await this.followsRepository
      .createQueryBuilder('follows')
      .leftJoin('follows.following', 'following')
      .leftJoin('follows.follower', 'follower')
      .where('following.id = :followingId', { followingId: req.user })
      .andWhere('follower.id = :followerId', { followerId: param.userId })
      .select(['follows.id'])
      .getOne();

    if (!isFollow) return false;

    return true;
  }
}
