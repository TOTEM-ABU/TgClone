import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGlobalMessageDto {
  @ApiProperty()
  @IsString()
  message: string;

  userId: string;
}
