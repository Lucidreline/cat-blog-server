import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      // Had to jump through this loop hole to remove passwords from being returned
      const stringUser = JSON.stringify(user);
      const newJsonUser = JSON.parse(stringUser);
      delete newJsonUser.password;

      return newJsonUser;
    }

    return null;
  }
}
