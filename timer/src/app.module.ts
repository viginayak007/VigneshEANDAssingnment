import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SchedularModule } from './schedular/schedular.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
const dotenv = require('dotenv').config().parsed;
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
  }), 
  ScheduleModule.forRoot(),
  JwtModule.register({
    global: true,
    secret: dotenv.secret,
    signOptions: { expiresIn: '2d' },
  }),
    UserModule, SubscriberModule, DatabaseModule, SchedularModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule]
})
export class AppModule {}
