import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AddressesService } from '../services/addresses.service';
import { Address } from '../domain/models/adress.model';
import { CreateAddressInput } from '../domain/inputs/create-address.input';
import { UpdateAddressInput } from '../domain/inputs/update-address.input';

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
    console.log(input, 'input');
    return this.addressesService.create(input);
  }

  @Mutation(() => Address)
  updateAddress(@Args('input') input: UpdateAddressInput) {
    return this.addressesService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  deleteAddress(@Args('id', { type: () => Number }) id: number) {
    return this.addressesService.delete(id);
  }
}
