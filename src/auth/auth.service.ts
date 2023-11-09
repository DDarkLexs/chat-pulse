import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticateUserDto, CreateUsuarioDto } from './dto/usuario.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async users(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }
  async findOne(usuario: Partial<Usuario>): Promise<Usuario> {
    return this.prisma.usuario.findFirst({
      where: {
        ...usuario,
      },
    });
  }
  async authenticate(usuario: AuthenticateUserDto): Promise<any> {
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
}
