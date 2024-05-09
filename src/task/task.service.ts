import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './model/task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<void> {
        await this.taskRepository.save({ name, userId, priority });
    }

    getTaskByName(name: string): Promise<Task> {
        return this.taskRepository.findOne({ where: { name } });
    }

    getUserTasks(userId: number): Promise<Task[]> {
        return this.taskRepository.find({ where: { id: userId } });
    }

    async resetData(): Promise<void> {
        await this.taskRepository.clear();
    }
}
