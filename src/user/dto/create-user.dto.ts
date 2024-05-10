import { IsEmail, IsInt, Min } from 'class-validator';

export class CreateUserDTO {
    @IsInt()
    @Min(1)
    id: number;
    @IsEmail()
    email: string;
}
