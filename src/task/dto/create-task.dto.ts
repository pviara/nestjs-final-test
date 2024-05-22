import { IsInt, Min, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTaskDTO {
    id: number;
    @IsNotEmpty()
    name: string;
    @IsInt()
    @Min(1)
    userId: number;
    @IsNotEmpty()
    @IsNumberString()
    priority: number;
}
