import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AddressesService } from '../services/addresses.service';
import { Address } from '../entities/adress.entity';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';

@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Query(() => [Address], { name: 'addresses' })
  async findAll() {
    return this.addressesService.findAll();
  }

  @Query(() => Address, { name: 'address' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.addressesService.findOne(id);
  }

  @Mutation(() => Address)
  createAddress(@Args('input') input: CreateAddressDTO) {
    return this.addressesService.create(input);
  }

  @Mutation(() => Address)
  updateAddress(@Args('input') input: UpdateAddressDTO) {
    return this.addressesService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  deleteAddress(@Args('id', { type: () => Number }) id: number) {
    return this.addressesService.delete(id);
  }
}
