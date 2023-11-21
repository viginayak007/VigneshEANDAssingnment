import { Injectable, Logger } from '@nestjs/common';
import { insertScheduleDto } from 'src/app-common/dto/scheduleDto';
import { schedule } from 'src/app-common/entity/schedule.entity';

@Injectable()
export class SchedularService {
     /** bulk insert multiple schedule */
     async bulkInsert(scheduleList): Promise<schedule[]> {
        return await schedule.bulkCreate(scheduleList, 
          { updateOnDuplicate: [ 'delivered', 'deliveredTime', 'active'] });
      }
}
