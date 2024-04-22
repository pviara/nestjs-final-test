import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.entity';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    @Post()
    async createUser(@Body() user: Partial<User>) {
        // Validate the payload
        if (!user.email || !this.isValidEmail(user.email)) {
            throw new HttpException('Invalid payload', HttpStatus.BAD_REQUEST);
        }

        // Check if the user already exists
        const existingUser = await this.userService.getUser(user.email);
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        // Create the user
        const createdUser = await this.userService.createUser(user.email);
        return createdUser;
    }
}
