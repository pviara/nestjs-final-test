import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @Min(1)
  priority: number;
}
