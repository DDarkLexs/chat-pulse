import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AmizadeController } from './amizade.controller';

@Module({
  controllers: [AmizadeController],
  providers: [PrismaService, AuthService],
})
export class AmizadeModule {}
