import { IsEmail } from 'class-validator';

export class CreateUserDTO {
    id: number;
    @IsEmail()
    email: string;
}
