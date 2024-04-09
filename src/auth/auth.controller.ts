import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { IUsuarioAtulizado } from 'src/@types/main';
import { Public } from 'src/jwt/jwt.constants';
import { AuthService } from './auth.service';
import { AuthenticateUserDto, CreateUsuarioDto } from './dto/usuario.dto';
/* 
                                                                                                       
  ,---.            ,--.  ,--.                      ,--.  ,--.                ,--.  ,--.                
 /  O  \ ,--.,--.,-'  '-.|  ,---.  ,---. ,--,--, ,-'  '-.`--' ,---. ,--,--.,-'  '-.`--' ,---. ,--,--,  
|  .-.  ||  ||  |'-.  .-'|  .-.  || .-. :|      \'-.  .-',--.| .--'' ,-.  |'-.  .-',--.| .-. ||      \ 
|  | |  |'  ''  '  |  |  |  | |  |\   --.|  ||  |  |  |  |  |\ `--.\ '-'  |  |  |  |  |' '-' '|  ||  | 
`--' `--' `----'   `--'  `--' `--' `----'`--''--'  `--'  `--' `---' `--`--'  `--'  `--' `---' `--''--' 
                                                                                                       
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  async loginIn(@Body() user: AuthenticateUserDto) {
    return this.authService.authenticate(user);
  }
}
@Controller('usuario')
export class UsuarioController {
  constructor(private authService: AuthService) {}
  @Get()
  async getOneFriend(@Query('userID') userID: string): Promise<Usuario> {
    
    const response = await this.authService.findOne({ userID: Number(userID) });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }
  @Get('perfil')
  async getOneUserById(@Req() req: any): Promise<Usuario> {
    const userID = req.user.userID;
    const response = await this.authService.findOne({ userID });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }
  @Patch('status')
  async AtualizaStatus(
    @Req() req: any,
    @Body('estado') estado: boolean,
  ): Promise<IUsuarioAtulizado> {
    return this.authService.setEstado(estado, req.user.userID);
  }

  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  async insertNewUser(
    @Body() createuserDto: CreateUsuarioDto,
  ): Promise<Usuario> {
    return this.authService.saveUser(createuserDto);
  }
}
