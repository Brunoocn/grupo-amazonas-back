import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchasesService } from './services/purchases.service';
import { PurchasesResolver } from './resolvers/purchases-resolver';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User])],
  providers: [PurchasesResolver, PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
