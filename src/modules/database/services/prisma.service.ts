import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit, Scope } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { LoggerService } from "@modules/logger/services/logger.service";

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new LoggerService();

    async onModuleInit() {
        try {
            this.logger.log("Connecting to the database", this.constructor.name);
            await this.$connect();
        } catch (error) {
            this.logger.error("Error connecting to the database", String(error), this.constructor.name);
            throw error;
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication) {
        process.on("beforeExit", async () => {
            await app.close();
        });
    }
}
