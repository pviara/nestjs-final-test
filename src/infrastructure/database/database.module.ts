import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../../user/model/user.entity';
import { Task } from '../../task/model/task.entity';
import { UserModule } from '../../user/user.module';
import { TaskModule } from '../../task/task.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: 24000,
            database: 'nestjs-final-test-db',
            username: 'postgres',
            password: 'postgres',
            host: 'localhost',
            entities: [User, Task],
            synchronize: true,
        }),
        UserModule,
        TaskModule,
    ],
})
export class DatabaseModule {}
