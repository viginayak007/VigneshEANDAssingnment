import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ValidateUserDto } from 'src/app-common/dto/userDto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(public authService: AuthService, private jwtService: JwtService){}
      @Post()
      @UsePipes(ValidationPipe)
      async find(@Res() res, @Body() {name, password} : ValidateUserDto): Promise<Response> {
        const userDetails = await this.authService.fetchUserDetails(name);
        if (userDetails) {
          const validPassword = await bcrypt.compare(password, userDetails.password);
          if (validPassword) {
            if (userDetails.active) {
              const payload = { name };
              const access_token = await this.jwtService.signAsync(payload)
              res.cookie('access_token', access_token, {
                  httpOnly: true,
                  secure: false,
                  sameSite: 'lax',
                  expires: new Date(Date.now() + 2 * 24 * 60 * 1000),
              }).send({ status: 'ok' });
            
            } else {
                return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                  message: `User has been Deactivated; please contact support`,
                  isError: true
                })
            }
          } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({
              message: `Invalid Password`,
              isError: true
            })
          }
        } else { 
          return res.status(HttpStatus.NOT_FOUND).json({
            message: `User Name: ${ name } Not found`,
            isError: true
          })
        
        }
    }
}
