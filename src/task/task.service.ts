import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async addTask(name: string, userId: string, priority: number): Promise<Task> {
    const newTask = new this.taskModel({ name, userId, priority });
    return newTask.save();
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }

  async resetData(): Promise<void> {
    await this.taskModel.deleteMany({});
  }

  async getTaskByName(name: string): Promise<Task> {
    const task = await this.taskModel.findOne({ name }).exec();
    if (!task) {
      throw new NotFoundException(`Task with name ${name} not found`);
    }
    return task;
  }
}
