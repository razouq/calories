import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InviteFriendDTO } from 'src/users/dto/invite-friend.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendInvitation(inviteFriendDTO: InviteFriendDTO, currentUser) {
    await this.mailerService.sendMail({
      to: inviteFriendDTO.email,
      subject: 'Welcome to Calories App!',
      template: './invitation',
      context: {
        receiverName: inviteFriendDTO.receiverName,
        senderName: currentUser.name,
        password: 'anzoefin',
      },
    });
  }
}
