import { Injectable } from '@nestjs/common';
import { CreateGlobalMessageDto } from './dto/create-global-message.dto';
import { UpdateGlobalMessageDto } from './dto/update-global-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GlobalMessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateGlobalMessageDto) {
    try {
      let global = await this.prisma.globalMessage.create({ data });
      return global;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      let global = await this.prisma.globalMessage.findMany({
        include: { user: true },
      });
      return global;
    } catch (error) {
      return error;
    }
  }

  async findMy(myId: string) {
    try {
      let global = await this.prisma.globalMessage.findMany({
        where: {
          user: {
            some: { id: myId },
          } as any,
        },
      });
      return global;
    } catch (error) {
      return error;
    }
  }
}
