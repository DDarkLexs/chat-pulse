import { Mensagem } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class PostMessageDto
  implements Pick<Mensagem, 'destinarioID' | 'texto'>
{
  @IsNotEmpty({ message: 'informe o destinarioID' })
  destinarioID: number;
  @IsNotEmpty({ message: 'informe a mensagem' })
  texto: string;
}
