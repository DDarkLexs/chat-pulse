import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '@prisma/client';
import { IUsuarioAtulizado, IUsuarioAutenticado } from 'src/@types/main';
import { jwtConstants } from 'src/jwt/jwt.constants';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticateUserDto, CreateUsuarioDto } from './dto/usuario.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async users(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }
  async findOneFriend(
    usuario: Partial<Usuario>,
  ): Promise<Omit<Usuario, 'senha'>> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        ...usuario,
      },
    });
    if (!user) {
      throw new NotFoundException(
        `Desculpe, não encontramos nenhum usuário. Por favor, verifique o número e tente novamente.`,
      );
    }
    delete user.senha;
    return user;
  }
  async findOne(usuario: Partial<Usuario>): Promise<Usuario> {
    return this.prisma.usuario.findFirst({
      where: {
        ...usuario,
      },
    });
  }
  async authenticate(
    usuario: AuthenticateUserDto,
  ): Promise<IUsuarioAutenticado> {
    const userIn = await this.findOne(usuario);
    if (!userIn) {
      throw new UnauthorizedException(
        'Usuário não encontrado. Verifique suas credenciais e tente novamente.',
      );
    }
    delete userIn.senha;

    return {
      usuario: { ...userIn },
      token: await this.jwtService.signAsync(userIn),
    };
  }
  async saveUser(userDto: CreateUsuarioDto): Promise<Usuario> {
    const findNumber = await this.findOne({ telefone: userDto.telefone });
    if (findNumber) {
      throw new ConflictException(
        'Já existe uma conta associada a este número de telefone.',
      );
    }
    const response = await this.prisma.usuario.create({
      data: userDto,
    });

    return response;
  }
  async setEstado(estado: boolean, userID: number): Promise<IUsuarioAtulizado> {
    const response = await this.prisma.usuario.update({
      where: {
        userID,
      },
      data: {
        online: estado,
      },
    });
    delete response.senha;
    return response;
  }

  async verify(token: string): Promise<Usuario> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    return payload;
  }
}
