import { Module } from '@nestjs/common';
import { GlobalMessageService } from './global-message.service';
import { GlobalMessageController } from './global-message.controller';

@Module({
  controllers: [GlobalMessageController],
  providers: [GlobalMessageService],
})
export class GlobalMessageModule {}
