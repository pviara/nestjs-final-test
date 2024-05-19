import {
    Param,
    Body,
    Controller,
    Get,
    Post,
    ParseIntPipe,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { Task } from './model/task.entity';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';

@Controller()
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService,
    ) {}

    @Get('/')
    async getTasks() {
        const tasks = await this.taskService.getTasks();
        return {
            STATUS_CODES: HttpStatus.OK,
            tasks,
        };
    }

    @Get('/user/:userId')
    async getTasksByUserId(@Param('userId', ParseIntPipe) userId: number) {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new HttpException(
                'User does not exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        const tasks = await this.taskService.getUserTasks(userId);
        return tasks;
    }

    @Post('/')
    async createTask(
        @Body() task: Partial<Task>,
        @Body('userId', ParseIntPipe) userId: number,
    ) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new HttpException(
                'User does not exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        const createdTask = await this.taskService.addTask(
            task.name,
            userId,
            task.priority,
        );
        return createdTask;
    }
}
