import { Module } from '@nestjs/common';
import { PurchasesService } from './service/purchases.service';
import { PurchasesController } from './controller/purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PurchasesEntity from 'src/models/purchases.entity';

@Module({

  providers: [PurchasesService],

  controllers: [PurchasesController],

  imports: [TypeOrmModule.forFeature([PurchasesEntity])]
})
export class PurchasesModule {}
