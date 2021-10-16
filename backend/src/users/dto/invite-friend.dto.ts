import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteFriendDTO {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
