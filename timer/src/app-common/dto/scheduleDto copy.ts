import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsArray, IsNumber, IsEnum } from 'class-validator';
import { validDateTimeFormat } from '../validation/date-time-format/date-time-format';
const dotenv = require('dotenv').config().parsed;
export enum weekDayType {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6, 
    Sunday = 7
  }
export class CreateScheduleDto {
    @ApiProperty({
        type: 'string',
        description: "Email Subject",
        example: "Discount Offer",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: 'string',
        description: "body of the Email",
        example: "<HTML>...</HTML>",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    body: string;
   
    @ApiProperty({
        type: 'ISODate',
        description: `timestamp must be ${dotenv.isoFormat}, kindly timezone in UTC i.e -00:00`,
        example: "2023-11-20T22:00:00z",
        required: true
    })
    @IsNotEmpty()
    @validDateTimeFormat(dotenv.isoFormat,{
        message: `Invalid timestamp format should be ${dotenv.isoFormat}`,
      })
    timestamp: string;

    @ApiProperty({
        type: 'Array',
        description: "Array of subscribeIds in array",
        example: "[1, 3]",
        required: true
    })
    @IsNotEmpty()
    @IsArray()
    @IsNumber({},{ each: true })
    subscriberIds: number[];

    @ApiProperty({
        type: 'number',
        description: "userId",
        example: 1,
        required: false
    })
    @IsNumber()
    userId: number;
}
export class CreateCampaignDto {
    @ApiProperty({
        type: 'string',
        description: "Email Subject",
        example: "Discount Offer",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: 'string',
        description: "body of the Email",
        example: "<HTML>...</HTML>",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    body: string;
   
    @ApiProperty({
        type: 'Date',
        description: `Time must be ${dotenv.timeFormat}, kindly timezone in UTC i.e -00:00`,
        example: "20:20:00",
        required: true
    })
    @IsNotEmpty()
    @validDateTimeFormat(dotenv.timeFormat,{
        message: `Invalid time format should be ${dotenv.timeFormat}`,
      })
    time: string

    @ApiProperty({
        type: 'Date',
        description: `startDate must be ${dotenv.dateFormat}, kindly timezone in UTC i.e -00:00`,
        example: "2023-11-20",
        required: true
    })
    @IsNotEmpty()
    @validDateTimeFormat(dotenv.dateFormat,{
        message: `Invalid startDate format should be ${dotenv.dateFormat}`,
      })
    startDate: string

    @ApiProperty({
        type: 'Date',
        description: `Date must be ${dotenv.dateFormat}, kindly timezone in UTC i.e -00:00`,
        example: "2023-11-30",
        required: true
    })
    @IsNotEmpty()
    @validDateTimeFormat(dotenv.dateFormat,{
        message: `Invalid endDate format should be ${dotenv.dateFormat}`
      })
    endDate: string
    
    @ApiProperty({
        type: 'weekDayType[]',
        description: "Days of the week in integer 1-7 where 1 is Monday and 7 is Sunday",
        example: [1, 3, 5],
        required: true
    })
    @IsEnum(weekDayType,{ each: true })
    selectedIsoWeekdays: weekDayType[]

    @ApiProperty({
        type: 'Array',
        description: "Array of subscribeIds in array",
        example: "[1]",
        required: true
    })
    @IsNotEmpty()
    @IsArray()
    @IsNumber({},{ each: true })
    subscriberIds: number[];

    @ApiProperty({
        type: 'number',
        description: "userId",
        example: 1,
        required: false
    })
    @IsNumber()
    userId: number;

}

export class insertScheduleDto {
    taskId: number;
    subscriberId: number;
    time: Date;
    delivered: boolean;
    deliveredTime?: Date;
    active: boolean
}

export class insertCampaignDto {
    taskId: number;
    subscriberId: number;
    startDate: Date;
    endDate: Date;
    time: Date;
    selectedIsoWeekday: []
    delivered: boolean;
    deliveredTime?: Date;
    active: boolean
}
