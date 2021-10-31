import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('who-am-i')
  whoAmI(@Request() req): Promise<User | null> {
    const currentUser = req.user;
    if (currentUser == undefined) return null;
    else return currentUser;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(@Request() req) {
    const currentUser = req.user;
    req.logout();
    return currentUser;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return req.user;
  }

  @Post('register')
  async register(@Body() user: User, @Request() req, @Response() res) {
    const newUser = await this.usersService.createUser(user);

    req.login(newUser, () => {
      const stringUser = JSON.stringify(req.user); // remove password before returning user
      const newJsonUser = JSON.parse(stringUser);
      delete newJsonUser.password;
      res.json(newJsonUser);
    });
  }
}
