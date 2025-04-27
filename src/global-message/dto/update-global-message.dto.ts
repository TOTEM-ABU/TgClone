import { PartialType } from '@nestjs/swagger';
import { CreateGlobalMessageDto } from './create-global-message.dto';

export class UpdateGlobalMessageDto extends PartialType(CreateGlobalMessageDto) {}
