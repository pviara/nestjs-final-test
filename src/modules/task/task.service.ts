import type { Task } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "@infrastructures/database/services/prisma.service";

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

    addTask(name: string, userId: string, priority: number): Promise<Task> {
        return this.prisma.task.create({
            data: {
                name,
                priority,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    getTaskByName(name: string): Promise<Task | null> {
        return this.prisma.task.findFirst({
            where: {
                name,
            },
        });
    }

    getUserTasks(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: {
                userId,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.prisma.task.deleteMany();
        return Promise.resolve();
    }
}
