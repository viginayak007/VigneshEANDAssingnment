import { Body, Controller, Delete, Get, HttpStatus, ParseIntPipe, Post, Query, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveStatus } from 'src/app-common/class/active-status/active-status';
import { Pagination } from 'src/app-common/class/pagination/pagination';
import { CreateUserDto } from 'src/app-common/dto/userDto';
import { user } from 'src/app-common/entity/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(public userService: UserService){}
    @UseGuards(AuthGuard)
    @Get()
    @UsePipes(ValidationPipe)
    async findAll(@Query('limit', new ParseIntPipe()) limit: number, @Query('offset', new ParseIntPipe()) offset : number): Promise<user[]> {
      if (limit && offset) {
        return await this.userService.fetchAllWithLimit({
          limit: limit,
          offset: offset
        })
      } else {
        return await this.userService.fetchAll();
      }
    }

    @UseGuards(AuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Res() res, @Body() { name, password, active }: CreateUserDto): Promise<Response> {
      const userExists = await this.userService.checkExists(name);
      if (userExists) {
        return res.status(HttpStatus.FOUND).json({
          message: `User name with Email: ${name} already exists`,
          isError: true
        })
      } else { 
        await this.userService.insertNew({ name, password, active });
        return res.status(HttpStatus.OK).json({
          message: `user ${ name } has been created successfully`,
          isError: false
        })
      }
    }

    @UseGuards(AuthGuard)
    @Delete()
    @UsePipes(ValidationPipe)
    async updateActivation(@Res() res, @Body() { id, active }: ActiveStatus): Promise<Response> {
      await this.userService.changeActivation(id, active);
      return res.status(HttpStatus.OK).json({
        message: `user activations status is ${ active }`,
        isError: false
      })
    }
}
