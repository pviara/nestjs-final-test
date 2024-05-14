import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { User } from '../user/user.model';

@Injectable()
export class TaskService {
    successResponse: any;
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) {}

    async addTask(name: string, userId: number, priority: number): Promise<void> {
        const existingUser = await User.findByPk(userId);
        if (!existingUser) {
            throw new NotImplementedException('User does not exist');
        }
        await this.taskModel.create({ name, userId, priority});
    }

    getTaskByName(name: string): Promise<Task> {
        return this.taskModel.findOne({
            where: {
                name,
            }
        })
    }

    getUserTasks(userId: string): Promise<Task[]> {
        return this.taskModel.findAll({
            where: {
                userId,
            }
        })
    }

    async resetData(): Promise<void> {
        await this.taskModel.destroy({ where: {} });
    }
}
