import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductsEntity from 'src/models/product.entity';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports:[TypeOrmModule.forFeature([ProductsEntity])]
})
export class ProductsModule {}
