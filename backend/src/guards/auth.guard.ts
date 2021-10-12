import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.cookies['token'];
      if (!token) return false;
      const user = await this.usersService.findByToken(token);
      if (!user) return false;
      request.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
