import {
    Controller,
    Post,
    Body,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addUser(@Body() body: { email: string }) {
        if (!body.email || !this.isValidEmail(body.email)) {
            throw new BadRequestException('Invalid email');
        }
        try {
            const rlt = await this.userService.addUser(body.email);
            return rlt;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
