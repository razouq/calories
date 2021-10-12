import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from './dto/login.dto';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>,
  ) {}

  async findUser(credentials: LoginDTO) {
    const { email, password } = credentials;
    const user = await this.usersModel.findOne({ email });
    if (!user) throw new NotFoundException('User Not Found');
    if (password !== user.password)
      throw new BadRequestException('wrong credentials');

    return user;
  }

  async findByToken(token: string) {
    return this.usersModel.findOne({ token });
  }
}
