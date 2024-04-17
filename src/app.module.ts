import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule],
})
@Module({
        imports: [
            SequelizeModule.forRoot({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'root',
                password: 'root',
                database: 'test',
                autoLoadModels: true,
                synchronize: true,
            }),
        ],
})
export class AppModule {}
