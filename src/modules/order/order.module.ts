import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import OrderSchema from 'src/schemas/order.schema';
import { NotificationsModule } from '../notifications/notifications.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import UserSchema from '../../schemas/user.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    NotificationsModule,
  ],
  providers: [OrderRepository],
  controllers: [OrderController],
})
export class OrderModule {}
