import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { MailService } from 'src/mail/mail.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { InviteFriendDTO } from './dto/invite-friend.dto';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from './users.service';
import * as randomToken from 'random-token';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Post('/invite-friend')
  async inviteFriend(
    @Body() inviteFriendDTO: InviteFriendDTO,
    @CurrentUser() currentUser,
  ) {
    const password = randomToken(16);
    const emailExists = await this.usersService.findOneByEmail(
      inviteFriendDTO.email,
    );
    if (emailExists) throw new BadRequestException('email already a member');
    await this.usersService.createInvitedUser(inviteFriendDTO, password);
    this.mailService.sendInvitation(inviteFriendDTO, currentUser, password);
    return { success: true };
  }
}
