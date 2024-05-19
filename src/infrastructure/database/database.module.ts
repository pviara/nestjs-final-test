import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../../user/model/user.entity';
import { Task } from '../../task/model/task.entity';
import { UserModule } from '../../user/user.module';
import { TaskModule } from '../../task/task.module';
import { ConfigurationService } from '../configuration/configuration.service';
import * as dotenv from 'dotenv';
import { ConfigurationModule } from '../configuration/configuration.module';

dotenv.config(); //used to get process.env access

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [ConfigurationService],
            useFactory: (configService: ConfigurationService) => ({
                type: process.env.DATABASE_TYPE as any,
                port: configService.databaseConfig.DATABASE_PORT,
                database: configService.databaseConfig.DATABASE_NAME,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                host: process.env.DATABASE_HOST,
                entities: [User, Task],
                synchronize: true,
            }),
        }),
        UserModule,
        TaskModule,
    ],
})
export class DatabaseModule {}
