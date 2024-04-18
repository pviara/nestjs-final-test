import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';


@Module({
    imports: [
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: '172.20.0.2',
        port: 24000,
        username: 'postgres',
        password: 'postgres',
        database: 'create-postgres-db',
        autoLoadModels: true,
        synchronize: true,
      }),
      AppRoutingModule, 
      ConfigurationModule, 
      DatabaseModule,
      UserModule,
    ],

  })
export class AppModule {}
