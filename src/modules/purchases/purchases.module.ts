import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchasesService } from './services/purchases.service';
import { PurchasesResolver } from './resolvers/purchases-resolver';

import { User } from '../auth/domain/entities/user.entity';
import { Purchase } from './domain/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User])],
  providers: [PurchasesResolver, PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
