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

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(@Request() req) {
    const currentUser = req.user;
    req.logout();
    return currentUser;
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

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  privateRoute(@Request() req) {
    return { msg: `Welcome ${req.user.username}` };
  }
}
