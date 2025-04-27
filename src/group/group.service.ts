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

  async joinGr(data: JoinToGroupDto) {
    let joined = await this.prisma.user.update({
      where: { id: data.userId },
      data: {
        group: { set: [{ id: data.groupId }] },
      },
    });
    return joined;
  }

  async getGr(myId: string) {
    let gr = await this.prisma.group.findMany({
      where: {
        users: {
          some: { id: myId },
        },
      },
    });
    return gr;
  }

  async messageCreate(data: MessageToGroupDto) {
    let message = await this.prisma.groupMessage.create({ data });
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
