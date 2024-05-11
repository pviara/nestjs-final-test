import { IsInt, Min, IsNotEmpty } from 'class-validator';


export class CreateTaskDTO {
    id: number;
    @IsNotEmpty()
    name: string;
    @IsInt()
    @Min(1)
    userId: number;
    @IsInt()
    @Min(1)
    priority: number;
}