import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUSerDto } from './dtos/createUser.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Profiles } from './entities/profiles.entity';
import {
  ModifyIntroduceInputDto,
  ModifyIntroduceOutputDto,
} from './dtos/modifyIntroduce.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Profiles)
    private readonly profilesRepository: Repository<Profiles>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUSerDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.usersRepository.save({
      email: createUserDto.email,
      nickname: createUserDto.nickname,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user.id });

    return { token };
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
}
