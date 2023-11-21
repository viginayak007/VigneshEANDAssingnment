import { Body, Controller, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCampaignDto, CreateScheduleDto, insertScheduleDto } from 'src/app-common/dto/scheduleDto';
import { SchedularService } from './schedular.service';
import { HelperService } from './helper/helper.service';
import { TaskService } from './task/task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('schedular')
@Controller('schedular')
export class SchedularController {
    
    constructor(private taskService: TaskService,
        private schedularService: SchedularService,
        private helperService: HelperService) {}
    
    @UseGuards(AuthGuard)
    @Post('/oneTime')
    @UsePipes(ValidationPipe)
    async createOneTime(@Res() res, 
        @Body() {title, body, timestamp, subscriberIds, userId }: CreateScheduleDto): Promise<Response> {
        try {
            const subscriberExists = await this.helperService.subscriberExists(subscriberIds);
            if (subscriberExists) {
                const cornPattern = this.helperService.getCornPattern(timestamp);
                const task = await this.taskService.insertNew(title, body, cornPattern, userId, userId);
                const scheduleList = this.helperService.parseSubscription(
                    subscriberIds, 
                    task.id, 
                    timestamp, 
                    false, 
                    null, 
                    true)
                const result = await this.schedularService.bulkInsert(scheduleList);
                return res.status(HttpStatus.OK).json({
                    message: `Email campaign has been successfully scheduled`,
                    isError: false
                    })
            } else { 
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: `Subscribers or Subscriber doesn't exists`,
                    isError: true
                })   
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_GATEWAY).json({
                message: `Error while scheduling the Email campaign`,
                isError: true
            })
        }
    }
    @UseGuards(AuthGuard)
    @Post('/campaign')
    async createCampaign(@Res() res, 
        @Body() {title, body, subscriberIds, userId, time, startDate, endDate, selectedIsoWeekdays }: CreateCampaignDto): Promise<Response> {
        try {
            const validTimeRange = this.helperService.validateRange(startDate, endDate, time);
            if (validTimeRange) {
                const cornPattern = this.helperService.getRecessiveCornPattern(time, selectedIsoWeekdays);
                const task = await this.taskService.insertNew(title, body, cornPattern ,userId, userId);
                const subscriberExists = await this.helperService.subscriberExists(subscriberIds);
                if (subscriberExists) {
                    const scheduleList = this.helperService.parseSubscriptionsWithDays(
                        subscriberIds, 
                        task.id,
                        time,
                        startDate, 
                        endDate,
                        selectedIsoWeekdays, 
                        false, 
                        null, 
                        true)
                    const result = await this.schedularService.bulkInsert(scheduleList);
                    return res.status(HttpStatus.OK).json({
                        message: `Email campaign has been successfully scheduled`,
                        isError: false
                        })
                } else {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        message: `Subscribers or Subscriber doesn't exists`,
                        isError: true
                        })        
                }
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: `StartDate must be before endDate and Start date cannot be less than current time`,
                    isError: true
                  })
            } 
        } catch (error) {
            return res.status(HttpStatus.BAD_GATEWAY).json({
                message: `Error while scheduling the Email campaign`,
                isError: true
              })
        }
    }
    
}
