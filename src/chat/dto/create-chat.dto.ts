import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChatDto {
  // @ApiProperty()
  // @IsString()
  fromId: string;

  @ApiProperty()
  @IsString()
  toId: string;
}
