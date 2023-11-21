import { MiddlewareConsumer, Module } from '@nestjs/common';
import { Subscriber } from './subscriber';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';
import { TrimMiddleware } from 'src/app-common/middleware/trim/trim.middleware';

@Module({
  providers: [Subscriber, SubscriberService],
  controllers: [SubscriberController]
})
export class SubscriberModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TrimMiddleware)
      .forRoutes('subscriber');
  }
}
