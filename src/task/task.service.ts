import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    successResponse: any;
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<void> {
        await this.taskModel.create({
            name,
            userId,
            priority,
        });
    }

    getTaskByName(name: string): Promise<Task> {
        return this.taskModel.findOne({
            where: {
                name,
            },
        });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return this.taskModel.findAll({
            where: {
                userId,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.taskModel.destroy({ where: {} });
    }
}
