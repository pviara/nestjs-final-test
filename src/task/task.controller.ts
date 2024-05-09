import { Param, Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './model/task.entity';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';

@Controller()
export class TaskController {
    constructor(
        private taskService: TaskService,
        private userService: UserService,
    ) {}

    @Get('/user/:userId')
    async getTasksByUserId(@Param('userId') userId: number) {
        const user = await this.userService.findById(userId);

        if (!user) {
            return {
                STATUS_CODES: 400,
                message: 'User does not exist',
            };
        }

        const tasks = await this.taskService.getUserTasks(userId);
        return {
            STATUS_CODES: 200,
            tasks,
        };
    }

    @Post('/')
    async createTask(
        @Body() task: Partial<Task>,
        @Body('userId') userId: number,
    ) {
        const user = await this.userService.findById(userId);

        if (!user) {
            return {
                STATUS_CODES: 400,
                message: 'User does not exist',
            };
        }

        await this.taskService.addTask(task.name, userId, task.priority);
        return {
            STATUS_CODES: 201,
            message: 'Task created',
        };
    }
}
