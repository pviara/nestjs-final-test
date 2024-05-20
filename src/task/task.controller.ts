import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/user/:userId')
  async getUserTasks(@Param('userId') userId: string) {
    if (!this.isValidUserId(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    const tasks = await this.taskService.getUserTasks(userId);
    return tasks;
  }
  @Post()
  async addTask(@Body() body: { name: string; userId: string; priority: string }) {
    const { name, userId, priority } = body;
    if (!this.isValidTaskPayload(body)) {
      throw new HttpException('Invalid task payload', HttpStatus.BAD_REQUEST);
    }
    await this.taskService.addTask(name, userId, parseInt(priority, 10));
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Task created successfully',
    };
  }

  private isValidTaskPayload(body: { name: string; userId: string; priority: string }): boolean {
    const { name, userId, priority } = body;
    return (
      name.trim() !== '' &&
      userId.trim() !== '' &&
      !isNaN(parseInt(priority, 10)) &&
      parseInt(priority, 10) > 0
    );
  }

  private isValidUserId(userId: string): boolean {
    return /^[a-fA-F0-9]{24}$/.test(userId);
  }
}
