import { IsEmail, IsInt, Min } from 'class-validator';

export class CreateUserDTO {
    @IsInt()
    @Min(0)
    id: number;
    @IsEmail()
    email: string;
}
