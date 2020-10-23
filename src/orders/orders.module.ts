import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrdersEntity from 'src/models/orders.entity';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './service/orders.service';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([OrdersEntity])]
})
export class OrdersModule {}
