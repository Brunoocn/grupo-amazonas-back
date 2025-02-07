import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchasesService } from './services/purchases.service';
import { PurchasesResolver } from './resolvers/purchases-resolver';
import { Purchase } from './infra/entities/purchase.entity';
import { User } from '../auth/infra/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User])],
  providers: [PurchasesResolver, PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
