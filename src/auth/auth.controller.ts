import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from '@prisma/client';
import { AuthenticateUserDto, CreateUsuarioDto } from './dto/usuario.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/jwt/jwt.constants';
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
  @Get('perfil')
  async getOneUserById(@Req() req: any): Promise<Usuario> {
    const userID = req.user.userID;
    const response = await this.authService.findOne({ userID });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
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
