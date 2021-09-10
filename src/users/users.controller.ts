import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('login')
  login(): any {
    return {};
  }

  @Get('protected')
  privateRoute() {
    return { msg: "You've made it in son." };
  }
}
