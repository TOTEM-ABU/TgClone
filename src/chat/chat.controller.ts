import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Get()
  findAll(@Query('myId') myId: string) {
    return this.chatService.getChat(myId);
  }

  @Post('message')
  createMessage(@Body() data: CreateMessageDto) {
    return this.chatService.createMessage(data);
  }

  @Get('message')
  getMessages(@Query('chatId') chatId: string) {
    return this.chatService.getMessages(chatId);
  }
}
