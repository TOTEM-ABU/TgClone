import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  groupName: string;

  @ApiProperty()
  @IsString()
  name: string;
}
