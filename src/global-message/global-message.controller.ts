import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GlobalMessageService } from './global-message.service';
import { CreateGlobalMessageDto } from './dto/create-global-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('global-message')
export class GlobalMessageController {
  constructor(private readonly globalMessageService: GlobalMessageService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateGlobalMessageDto, @Req() req: Request) {
    return this.globalMessageService.create(data, req['user']);
  }

  @Get()
  findAll() {
    return this.globalMessageService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get()
  findById(myId: string, @Req() req: Request) {
    return this.globalMessageService.findMy(myId, req['user']);
  }
}
