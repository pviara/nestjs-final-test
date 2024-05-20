import { Controller, Post, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() userData: { email: string }) {
    const { email } = userData;
    if (!this.isValidEmail(email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
    try {
      const user = await this.userService.addUser(email);
      return user;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private isValidEmail(email: string): boolean {
    return /^\S+@\S+\.\S+$/.test(email);
  }
}
