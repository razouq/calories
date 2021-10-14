import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteFriendDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
