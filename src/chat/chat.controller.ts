import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateChatDto, @Req() req: Request) {
    return this.chatService.createChat(data, req['user']);
  }

  @Get()
  findAll(myId: string, @Req() req: Request) {
    return this.chatService.getChat(myId, req['user']);
  }

  @UseGuards(AuthGuard)
  @Post('message')
  createMessage(@Body() data: CreateMessageDto, @Req() req: Request) {
    return this.chatService.createMessage(data, req['user']);
  }

  @Get('message')
  getMessages(@Query('chatId') chatId: string) {
    return this.chatService.getMessages(chatId);
  }
}
