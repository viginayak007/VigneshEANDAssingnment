import { Injectable, Logger } from '@nestjs/common';
import { schedule } from 'src/app-common/entity/schedule.entity';

@Injectable()
export class SchedularService {
     fetchAll(): schedule[] | PromiseLike<schedule[]> {
         throw new Error('Method not implemented.');
     }
     fetchAllWithLimit(arg0: { limit: number; offset: number; }): schedule[] | PromiseLike<schedule[]> {
         throw new Error('Method not implemented.');
     }
     /** bulk insert multiple schedule */
     async bulkInsert(scheduleList): Promise<schedule[]> {
        return await schedule.bulkCreate(scheduleList, 
          { updateOnDuplicate: [ 'delivered', 'deliveredTime', 'active'] });
      }
      async findByID(id): Promise<schedule> {
        return await schedule.findByPk(id);
      }
      async findByTaskId(taskId): Promise<schedule[]> {
        return await schedule.findAll({
          where : {
            taskId
          } 
        });
      }
}
