import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.entity';

@Controller('/users')
export class UserController {
    constructor(private readonly userSevice: UserService) {}

    @Get('/all')
    async findAll(): Promise<User[]> {
        return this.userSevice.findAll();
    }
}
