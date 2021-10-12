import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/login')
  async login(
    @Body() credentials: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.usersService.findUser(credentials);
    response.cookie('token', user.token, { httpOnly: true });

    user.password = undefined;
    user.token = undefined;

    return user;
  }
}
