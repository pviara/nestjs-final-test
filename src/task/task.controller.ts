import { Controller, Post, Body, Get, Param, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { addTask } from './utils';

@Controller('')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('')
    @HttpCode(201)
    async addTask(@Body() body: addTask) {
        const rsl = await this.taskService.addTask(
            body.name,
            body.userId,
            body.priority,
        );
        return rsl;
    }

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        const userTasks = await this.taskService.getUserTasks(userId);
        return userTasks;
    }
}
