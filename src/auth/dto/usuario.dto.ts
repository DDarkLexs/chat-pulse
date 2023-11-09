import { Usuario } from '@prisma/client';
import { IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export interface UsuarioDto
  extends Pick<Usuario, 'nome' | 'telefone' | 'senha'> {}

export interface UsuarioAuthDto extends Pick<Usuario, 'telefone' | 'senha'> {}

export class AuthenticateUserDto implements UsuarioAuthDto {
  @IsPhoneNumber('AO', { message: 'Por favor, informe o número de telemóvel.' })
  telefone: string;
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'Por favor, informe a sua senha.' })
  senha: string;
}
export class CreateUsuarioDto implements UsuarioDto {
  @IsNotEmpty({ message: 'Por favor, informe o seu nome.' })
  nome: string;
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'Por favor, informe a sua senha.' })
  senha: string;
  @IsPhoneNumber('AO', { message: 'Por favor, informe o número de telemóvel.' })
  telefone: string;
}
