import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('/user/:userId')
    getUserTasks(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createTask(@Body() CreateTaskDTO: CreateTaskDTO 
    ) {
        await this.taskService.addTask(CreateTaskDTO.name, CreateTaskDTO.userId, CreateTaskDTO.priority);
    }  

}
