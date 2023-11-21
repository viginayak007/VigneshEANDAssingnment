import { Injectable } from '@nestjs/common';
import { task } from 'src/app-common/entity/task.entity';
import { EventJobService } from 'src/database/event-job.service';

@Injectable()
export class TaskService {
    constructor(private eventJobService : EventJobService) {

    }
    /** insert new subscriber */
    async insertNew(title: string, body: string, cronPattern: string, createdBy: number, updatedBy: number): Promise<task> {
        const result  = await task.findOrCreate({
            where: { title, cronPattern },
            defaults: {
                title, body, cronPattern, createdBy, updatedBy,
            }
        })
        this.eventJobService.initJobs()
        return result[0];
      }
}
