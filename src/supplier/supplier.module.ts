import { Module } from '@nestjs/common';
import { SupplierService } from './service/supplier.service';
import { SupplierController } from './controller/supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import SupplierEntity from 'src/models/supplier.entity';

@Module({
  providers: [SupplierService],
  controllers: [SupplierController],
  imports: [TypeOrmModule.forFeature([SupplierEntity])]
})
export class SupplierModule {}
