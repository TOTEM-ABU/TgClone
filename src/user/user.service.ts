import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    try {
      let existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new BadRequestException('User already exists!');
      }

      let hash = bcrypt.hashSync(data.password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          ...data,
          password: hash,
        },
      });
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async login(data: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('User not exists!');
    }

    const match = bcrypt.compareSync(data.password, user.password);

    if (!match) {
      throw new UnauthorizedException('Wrong credentials!');
    }

    let token = this.jwt.sign({ id: user.id });
    return token;
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new Error('User with this id not found!');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
      });
      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('User with this id not found!');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({ where: { id } });
      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('User with this id not found!');
      }
      throw error;
    }
  }
}
