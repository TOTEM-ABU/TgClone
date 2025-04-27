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
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JoinToGroupDto } from './dto/joinTo-group.dto';
import { MessageToGroupDto } from './dto/messageTo-group.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGr(createGroupDto);
  }

  @Post('join')
  joinGr(@Body() data: JoinToGroupDto) {
    return this.groupService.joinGr(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findById(@Query('myId') myId: string) {
    return this.groupService.getGr(myId);
  }

  @Post('message')
  message(@Body() data: MessageToGroupDto) {
    return this.groupService.messageCreate(data);
  }

  @Get('message')
  messageGet(@Query('groupId') groupId: string) {
    return this.groupService.messageGet(groupId);
  }
}
