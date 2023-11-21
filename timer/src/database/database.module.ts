import { Module } from '@nestjs/common';
import { databaseProviders } from './database';
import { DatabaseService } from './database.service';
import { EventJobService } from './event-job.service';

@Module({
    providers: [...databaseProviders, EventJobService, DatabaseService],
    exports: [...databaseProviders, DatabaseService, EventJobService],
})
export class DatabaseModule {}
