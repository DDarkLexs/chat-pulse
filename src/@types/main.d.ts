// prisma.d.ts

import { Mensagem, Usuario, Amizade } from '@prisma/client';

/**
 * Model Conversa
 */

/**
 * Model Mensagem
 */
export interface IUsuarioAutenticado{
  usuario: Usuario,
  token: string
}

export interface IUsuarioAtulizado extends Pick<Usuario,'senha'> {};

export interface IMensagem extends Mensagem {}


export interface IMensagensRecentes {
  mensagemID: number;
  texto: string;
  visto: boolean;
  created: string;
  updated: string;
  enviadorID: number;
  destinarioID: number;
  nome: string;
  userID: number;
  online: boolean;
  naoLido: number;
}
