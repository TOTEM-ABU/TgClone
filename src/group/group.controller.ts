import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JoinToGroupDto } from './dto/joinTo-group.dto';
import { MessageToGroupDto } from './dto/messageTo-group.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { request, Request } from 'express';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGr(createGroupDto);
  }

  @UseGuards(AuthGuard)
  @Post('join')
  joinGr(@Body() data: JoinToGroupDto, @Req() req: Request) {
    return this.groupService.joinGr(data, req['user']);
  }

  @UseGuards(AuthGuard)
  @Get()
  findById(myId: string, @Req() req: Request) {
    return this.groupService.getGr(myId, req['user']);
  }

  @UseGuards(AuthGuard)
  @Post('message')
  message(@Body() data: MessageToGroupDto, @Req() req: Request) {
    return this.groupService.messageCreate(data, req['user']);
  }

  @Get('message')
  messageGet(@Query('groupId') groupId: string) {
    return this.groupService.messageGet(groupId);
  }
}
