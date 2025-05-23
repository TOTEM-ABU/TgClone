import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinToGroupDto {
  @ApiProperty()
  @IsString()
  groupId: string;
  
  userId: string;
}
