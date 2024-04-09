import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesController } from './messages.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesGateway, MessagesService, PrismaService, AuthService],
})
export class MessagesModule {}
