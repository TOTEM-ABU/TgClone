import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GlobalMessageService } from './global-message.service';
import { CreateGlobalMessageDto } from './dto/create-global-message.dto';

@Controller('global-message')
export class GlobalMessageController {
  constructor(private readonly globalMessageService: GlobalMessageService) {}

  @Post()
  create(@Body() createGlobalMessageDto: CreateGlobalMessageDto) {
    return this.globalMessageService.create(createGlobalMessageDto);
  }

  @Get()
  findAll() {
    return this.globalMessageService.findAll();
  }

  @Get()
  findById(@Query('myId') myId: string) {
    return this.globalMessageService.findMy(myId);
  }
}
