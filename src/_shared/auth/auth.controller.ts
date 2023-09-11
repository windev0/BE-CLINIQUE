import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response, Request } from 'express';
import { ILoginDTO } from '../interface/auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDTO: CreateUserDto) {
    return this.authService.register(createUserDTO);
  }

  @Post('login')
  login(
    @Body() loginDTO: ILoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginDTO, response);
  }

  @Get()
  findOne(@Req() request: Request) {
    return this.authService.findOne(request);
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return this.authService.logout(response, request);
  }
}
