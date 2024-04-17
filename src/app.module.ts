import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule, UserModule],
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
        models: [User],
        autoLoadModels: true,
        synchronize: true,
      }),
    ],
  })
export class AppModule {}
