import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TrimMiddleware } from 'src/app-common/middleware/trim/trim.middleware';
import { AuthController } from './auth.controller';

@Module({
  providers: [ AuthService],
  controllers: [AuthController]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TrimMiddleware)
      .forRoutes('Auth');
  }
}
