import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AddressesService } from '../services/addresses.service';

import { Address } from '../infra/models/adress.model';
import { UpdateAddressInput } from '../infra/inputs/update-address.input';
import { CreateAddressInput } from '../infra/inputs/create-address.input';
import { DeleteAdress } from '../infra/models/deleteAdress.model';

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
  createAddress(@Args('input') input: CreateAddressInput) {
    return this.addressesService.create(input);
  }

  @Mutation(() => Address)
  updateAddress(@Args('input') input: UpdateAddressInput) {
    return this.addressesService.update(input);
  }

  @Mutation(() => DeleteAdress)
  deleteAddress(@Args('id', { type: () => Number }) id: number) {
    return this.addressesService.delete(id);
  }
}
