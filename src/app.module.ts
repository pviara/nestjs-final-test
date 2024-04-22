import { RouterModule } from '@nestjs/core';
import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { routes } from './app.routes';

@Module({
    imports: [
        AppRoutingModule,
        ConfigurationModule,
        DatabaseModule,
        UserModule,
        TaskModule,
        RouterModule.register(routes), // Corrected this line
    ],
})
export class AppModule {}
