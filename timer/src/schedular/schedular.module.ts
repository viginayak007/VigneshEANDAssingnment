import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TrimMiddleware } from 'src/app-common/middleware/trim/trim.middleware';
import { SchedularController } from './schedular.controller';
import { Schedular } from './schedular';
import { SchedularService } from './schedular.service';
import { HelperService } from './helper/helper.service';
import { TaskService } from './task/task.service'
import { EventJobService } from 'src/database/event-job.service';
import { TaskController } from './task/task.controller';

@Module({
  providers: [Schedular, SchedularService, TaskService, HelperService, EventJobService],
  controllers: [SchedularController, TaskController]
})
export class SchedularModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TrimMiddleware)
      .forRoutes('schedular');
  }
}
