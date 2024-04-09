import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import type { IMensagem, IMensagensRecentes } from 'src/@types/main';
import { PostMessageDto } from './dto/message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private msgService: MessagesService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async InsertMessage(
    @Req() req,
    @Body() body: PostMessageDto,
  ): Promise<IMensagem> {
    const user: Usuario = req.user;
    const response = await this.msgService.setMessagem(
      user.userID,
      Number(body.destinarioID),
      body.texto,
    );
    return response;
  }
  @Patch('/lido')
  async marcarMsgLido(
    @Req() req,
    @Body('amigoID') amigoID: number,
  ): Promise<object> {
    const user: Usuario = req.user;
    const response = await this.msgService.marcarTodoMsgLido(
      user.userID,
      amigoID,
    );
    return response;
  }
  @Get('Inbox')
  async consultarUltimasMensagensAmigos(
    @Req() req,
  ): Promise<IMensagensRecentes[]> {
    return this.msgService.buscarUltimasMsgDeAmigos(req.user.userID);
  }

  @Get('Inbox/amigo')
  async consultarUltimasMensagemDe1Amigo(
    @Req() req,
    @Query('id_amigo') id: string,
  ) {
    // console.log(req);
    return this.msgService.buscarMsgAnterior(req.user.userID, Number(id));
  }
}
