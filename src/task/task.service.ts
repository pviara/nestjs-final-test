import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from '../schemas/task.schema';
import { UserService } from '../user/user.service';
import { isValidTaskPayload } from './utils';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        private userService: UserService,
    ) {}

    async addTask(name: string, userId: string, priority: number) {
        if (!isValidTaskPayload(name, userId, priority)) {
            throw new BadRequestException('Invalid task payload');
        }

        const user = await this.userService.getUser(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const task = new this.taskModel({ name, userId: user.id, priority });
        const rlt = await task.save();
        return rlt;
    }

    async getTaskByName(name: string): Promise<Task> {
        const task = await this.taskModel.findOne({ name });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        if (!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid user ID');
        }
        const tasks = await this.taskModel.find({ userId }).exec();
        return tasks.map((task) => task.toJSON());
    }

    async resetData(): Promise<void> {
        await this.taskModel.deleteMany({});
    }
}
