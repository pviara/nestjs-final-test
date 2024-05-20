import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [() => ({
                mongodb: {
                    uri: `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
                },
            })],
        }),
    ],
    providers: [ConfigurationService],
    exports: [ConfigurationService],
})
export class ConfigurationModule {}

