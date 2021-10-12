import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteFriendDTO {
  @IsNotEmpty()
  receiverName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
