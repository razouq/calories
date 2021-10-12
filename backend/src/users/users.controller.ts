import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { MailService } from 'src/mail/mail.service';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from './current-user.decorator';
import { InviteFriendDTO } from './dto/invite-friend.dto';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from './users.service';

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
    this.mailService.sendInvitation(inviteFriendDTO, currentUser);
    return inviteFriendDTO;
  }
}
