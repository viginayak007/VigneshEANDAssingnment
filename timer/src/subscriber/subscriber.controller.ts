import { Body, Controller, Delete, Get, HttpStatus, ParseIntPipe, Post, Query, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { subscriber } from '../app-common/entity/subscriber.entity';
import { CreateSubscriberDto } from '../app-common/dto/subscriberDto';
import { SubscriberService } from './subscriber.service';
import { ActiveStatus } from 'src/app-common/class/active-status/active-status';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('subscriber')
@Controller('subscriber')
export class SubscriberController {
  constructor(public subscriberService: SubscriberService){}
    @UseGuards(AuthGuard)
    @Get()
    @UsePipes(ValidationPipe)
    async findAll(@Query('limit', new ParseIntPipe()) limit: number, @Query('offset', new ParseIntPipe()) offset : number): Promise<subscriber[]> {
      if (limit && offset) {
        return await this.subscriberService.fetchAllWithLimit(
          limit,
          offset
        )
      } else {
        return await this.subscriberService.fetchAll();
      }
    }
    @UseGuards(AuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Res() res, @Body() { name, email, active, userId }: CreateSubscriberDto): Promise<Response> {
      const userExists = await this.subscriberService.checkExists(email);
      if (userExists) {
        return res.status(HttpStatus.FOUND).json({
          message: `Subscriber with Email: ${email} already exists`,
          isError: true
        })
      } else { 
        await this.subscriberService.insertNew({ name, email, active, userId });
        return res.status(HttpStatus.OK).json({
          message: `Subscriber ${ name } has been created successfully`,
          isError: false
        })
      }
    }
    @UseGuards(AuthGuard)
    @Delete()
    @UsePipes(ValidationPipe)
    async updateActivation(@Res() res, @Body() { id, active }: ActiveStatus): Promise<Response> {
      await this.subscriberService.changeActivation(id, active);
      return res.status(HttpStatus.OK).json({
        message: `Subscriber activations status is ${ active }`,
        isError: false
      })
    }
}
