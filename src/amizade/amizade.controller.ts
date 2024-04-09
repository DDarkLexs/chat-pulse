import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { AuthService } from '../auth/auth.service';

@Controller('amizade')
export class AmizadeController {
  constructor(private authService: AuthService) {}
  @Get()
  async getOneFriendByTelemovel(
    @Query('telefone') telefone: string,
  ): Promise<Omit<Usuario, 'senha'>> {
    if (!telefone) {
      throw new NotFoundException(
        `Desculpe, não encontramos nenhum usuário associado ao número de telefone ${telefone}. Por favor, verifique o número e tente novamente.`,
      );
    }
    const response = await this.authService.findOneFriend({
      telefone: telefone,
    });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }
}
