import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinToGroupDto } from './dto/joinTo-group.dto';
import { MessageToGroupDto } from './dto/messageTo-group.dto';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async createGr(data: CreateGroupDto) {
    let gr = await this.prisma.group.create({ data });
    return gr;
  }

  async joinGr(data: JoinToGroupDto, userId: string) {
    let joined = await this.prisma.user.update({
      where: { id: userId },
      data: {
        group: { set: [{ id: data.groupId }] },
      },
    });
    return joined;
  }

  async getGr(myId: string, user?: any) {
    let gr = await this.prisma.group.findMany({
      where: {
        users: {
          some: { id: myId },
        },
      },
    });
    return gr;
  }

  async messageCreate(data: MessageToGroupDto, fromId: string) {
    let message = await this.prisma.groupMessage.create({
      data: {
        ...data,
        fromId: fromId,
      },
    });
    return message;
  }

  async messageGet(groupId: string) {
    let messages = await this.prisma.groupMessage.findMany({
      where: {
        groupId,
      },
    });
    return messages;
  }
}
