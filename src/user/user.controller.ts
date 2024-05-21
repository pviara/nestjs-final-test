import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { handleException } from './utils';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addUser(@Body() body: { email: string }) {
        try {
            const rlt = await this.userService.addUser(body.email);
            return rlt;
        } catch (e) {
            handleException(e);
        }
    }
}
