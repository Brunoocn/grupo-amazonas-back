import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/adress.entity';
import { AddressesResolver } from './resolvers/address-resolver';
import { AddressesService } from './services/addresses.service';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
})
export class AdressesModule {}
