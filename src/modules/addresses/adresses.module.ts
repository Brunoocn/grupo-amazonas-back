import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesResolver } from './resolvers/address-resolver';
import { AddressesService } from './services/addresses.service';

import { User } from '../auth/domain/entities/user.entity';
import { Address } from './domain/entities/adress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
})
export class AdressesModule {}
