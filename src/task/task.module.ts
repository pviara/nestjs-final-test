import { Module } from '@nestjs/common';
import { Task } from './model/task.entity';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), UserModule],
    controllers: [TaskController],
    providers: [TaskService, UserService],
})
export class TaskModule {}
