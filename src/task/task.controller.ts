import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('/user/:userId')
    getUserTasks(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }

    @Post()
    async createTask(
        @Body('name') name: string,
        @Body('userId') userId: number,
        @Body('priority') priority: number,
    ) {
        await this.taskService.addTask(name, userId, priority);
    }  

}
