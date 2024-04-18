import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.addUser(createUserDTO.email);
    }

    @Get(':userId')
    getUser(@Param('email') email: string) {
        return this.userService.getUser(email); 
    }

    
}
