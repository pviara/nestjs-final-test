import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) {}

    get mongodbUri(): string {
        const uri = this.configService.get<string>('mongodb.uri');
        if (!uri) {
            throw new Error('MongoDB URI is not defined in the environment variables.');
        }
        return uri;
    }
}
