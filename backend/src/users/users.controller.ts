import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MailService } from 'src/mail/mail.service';
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

  @Post('/invite-friend')
  async inviteFriend(@Body() inviteFriendDTO: InviteFriendDTO) {
    const currentUser = {
      name: 'anass',
    };

    this.mailService.sendInvitation(inviteFriendDTO, currentUser);

    return inviteFriendDTO;
  }
}
