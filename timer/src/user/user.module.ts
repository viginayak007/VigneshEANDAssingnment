import { MiddlewareConsumer, Module } from '@nestjs/common';
import { User } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TrimMiddleware } from 'src/app-common/middleware/trim/trim.middleware';

@Module({
  providers: [User, UserService],
  controllers: [UserController]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TrimMiddleware)
      .forRoutes('user');
  }
}
