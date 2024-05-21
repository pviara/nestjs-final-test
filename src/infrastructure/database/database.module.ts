import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [ConfigurationService],
            useFactory: (configService: ConfigurationService) => ({
                uri: `mongodb://localhost:${configService.databaseConfig.DATABASE_PORT}/${configService.databaseConfig.DATABASE_NAME}`,
            }),
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
