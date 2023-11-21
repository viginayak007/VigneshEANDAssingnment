import { Injectable } from '@nestjs/common';
import { insertScheduleDto } from 'src/app-common/dto/scheduleDto';
import * as moment from 'moment-timezone';
import { subscriber } from 'src/app-common/entity/subscriber.entity';
const dotenv = require('dotenv').config().parsed;
@Injectable()
export class HelperService {
    /** prepare the results for the multiple records for single day */
    parseSubscription(subscriberIds: number [], taskId, time, delivered, deliveredTime, active): insertScheduleDto[]{
        const list: insertScheduleDto[] =  subscriberIds.map(subscriberId => {
            return {
                taskId,
                subscriberId,
                time,
                delivered,
                deliveredTime,
                active
            }
        });
    return list;
    }
    /** prepare the results for the multiple records for single day  */
    parseSubscriptionsWithDays(subscriberIds: number [], taskId, time, startDate, 
        endDate, selectedIsoWeekdays: number[],delivered, deliveredTime, active): insertScheduleDto[] {
            const momentStartDate = moment(`${startDate} ${time}`, 'YYYY-MM-DD HH:mm:ss');
            const momentEndDate = moment(`${endDate} ${time}`);
            let list: insertScheduleDto[] = [];
            while (momentStartDate.isSameOrBefore(momentEndDate)) {
                if(selectedIsoWeekdays.indexOf(momentStartDate.isoWeekday()) !== -1) {
                    const dayTimestamp = momentStartDate.format(dotenv.isoFormat);
                    const perDayList: insertScheduleDto[] =  this.parseSubscription(
                        subscriberIds,
                        taskId,
                        dayTimestamp,
                        delivered,
                        deliveredTime,
                        active
                    );
                    list.push(...perDayList)
                }
                momentStartDate.add(1, 'days'); 
            }
    return list;
    }
   validateRange(startDate: string, endDate: string, time: string): boolean {
        let momentStartDt  = moment(`${startDate}T${time}z`, dotenv.isoFormat, true);
        console.log(moment.utc(new Date()))
        const isAfterCurrentDay = momentStartDt.isSameOrAfter(moment.utc(new Date()), dotenv.validAfter)
        if ( momentStartDt.isValid() && isAfterCurrentDay) {
          let momentEndDt  =  moment(`${endDate}T${time}z`, dotenv.isoFormat, true);;
          if (momentEndDt.isValid()) {
            return momentEndDt.isSameOrAfter(momentStartDt, dotenv.validAfter)
          }
        }
        return false;
      }
      async subscriberExists(subscribers: number[]): Promise<boolean> {
        for (let s of subscribers) {
            const exists = await subscriber.findByPk(s);
            if (!exists) {
                return false;
            }
        }
        return true;
      }
      getCornPattern(timestamp: string | Date): string{
        try{
            const momentObject = moment(timestamp, dotenv.isoFormat).local();
            const pattern = 
                `${momentObject.second()} ${momentObject.minute()} ${ momentObject.hour() } ${ momentObject.format('DD') } ${ momentObject.format('MM')} *`;
            return pattern;
        } catch(error) {
            throw new Error(error)
        }
      }
    getRecessiveCornPattern(time: string, days: number[]): string{
        try{
            const momentObject = moment(time, dotenv.timeFormat).local();
            const pattern =
                `${momentObject.second()} ${momentObject.minute()} ${ momentObject.hour() } * * ${JSON.stringify(days)}`;
            return pattern.replace(/[[\]]/g, '');
        } catch(error) {
            throw new Error(error)
        }
     }
}
