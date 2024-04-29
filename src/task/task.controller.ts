import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('/user/:userId')
    getUserTasks(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }

}
