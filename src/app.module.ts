import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MessagesModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
