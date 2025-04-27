import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(data: CreateChatDto) {
    let chat = await this.prisma.chat.create({ data });
    return chat;
  }

  async deleteChat(id: string) {
    let chat = await this.prisma.chat.delete({ where: { id } });
    return chat;
  }

  async getChat(myId: string) {
    let chat = await this.prisma.chat.findMany({
      where: {
        OR: [{ fromId: myId }, { toId: myId }],
      },
      include: {
        from: true,
        to: true,
      },
    });
    return chat;
  }

  async createMessage(data: CreateMessageDto) {
    let message = this.prisma.message.create({ data });
    return message;
  }

  async getMessages(chatId: string) {
    let messages = this.prisma.message.findMany({
      where: {
        chatId,
      },
    });
    return messages;
  }
}
