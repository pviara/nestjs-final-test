import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    BadRequestException,
    HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('')
    @HttpCode(201)
    async addTask(
        @Body() body: { name: string; userId: string; priority: number },
    ) {
        if (
            !body.name ||
            !body.userId ||
            parseInt(body.priority.toString()) <= 0
        ) {
            throw new BadRequestException('Invalid task payload');
        }
        const rsl = await this.taskService.addTask(
            body.name,
            body.userId,
            body.priority,
        );
        return rsl;
    }

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        if (!userId.match(/^[a-f\d]{24}$/i)) {
            throw new BadRequestException('Invalid user ID');
        }
        const userTasks = await this.taskService.getUserTasks(userId);
        return userTasks;
    }
}
