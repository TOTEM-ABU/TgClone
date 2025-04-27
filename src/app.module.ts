import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { GroupModule } from './group/group.module';
import { GlobalMessageModule } from './global-message/global-message.module';

@Module({
  imports: [UserModule, ChatModule, PrismaModule, GroupModule, GlobalMessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
