import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageToGroupDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  fromId: string;

  @ApiProperty()
  @IsString()
  groupId: string;
}
