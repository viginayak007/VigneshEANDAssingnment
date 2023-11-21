import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCampaignDto, CreateScheduleDto, insertScheduleDto } from 'src/app-common/dto/scheduleDto';
import { schedule } from 'src/app-common/entity/schedule.entity';
import { task } from 'src/app-common/entity/task.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { HelperService } from '../helper/helper.service';
import { SchedularService } from '../schedular.service';
import { TaskService } from './task.service';


@ApiTags('task')
@Controller('task')
export class TaskController {
    
    constructor(private taskService: TaskService,
        private schedularService: SchedularService,
        private helperService: HelperService) {}
  
    @UseGuards(AuthGuard)
    @Get(':id')
    @UsePipes(ValidationPipe)
    async findAllTaskByID(@Param ('id') id: number ): Promise<task> {
      return this.taskService.findByID(id)
    }

    @UseGuards(AuthGuard)
    @Get()
    @UsePipes(ValidationPipe)
    async findAllByTaskID(@Query ('taskID') taskID: number ): Promise<schedule[]> {
      return this.schedularService.findByTaskId(taskID)
    }

    @UseGuards(AuthGuard)
    @Get('/tasksAll')
    @UsePipes(ValidationPipe)
    async findAllTask(@Query('limit', new ParseIntPipe()) limit: number, @Query('offset', new ParseIntPipe()) offset : number): Promise<task[]> {
      if (limit && offset) {
        return await this.taskService.fetchAllWithLimit({
          limit: limit,
          offset: offset
        })
      } else {
        return await this.taskService.fetchAll();
      }
    }
   
}

