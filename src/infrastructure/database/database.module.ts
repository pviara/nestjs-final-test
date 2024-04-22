import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';
import { ConfigModule } from '@nestjs/config';

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
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UserModule,
        TaskModule,
    ],
})
export class DatabaseModule {}
