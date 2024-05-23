import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './model/task.entity';
import { User } from '../user/model/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<Task> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const task = this.taskRepository.create({ name, user, priority });
        return this.taskRepository.save(task);
    }

    getTaskByName(name: string): Promise<Task> {
        return this.taskRepository.findOne({ where: { name } });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return this.taskRepository.find({
            where: { user: { id: userId } },
        });
    }

    async resetData(): Promise<void> {
        await this.taskRepository.clear();
    }
}
