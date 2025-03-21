import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { PurchasesService } from '../services/purchases.service';

import { Purchase } from '../infra/models/purchase.model';
import { CreatePurchaseInput } from '../infra/inputs/create-purchase.input';
import { UpdatePurchaseInput } from '../infra/inputs/update-purchase.input';
import { DeletePurchase } from '../infra/models/deletePurchase.model';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Query(() => [Purchase], { name: 'purchases' })
  findAll() {
    return this.purchasesService.findAll();
  }

  @Query(() => Purchase, { name: 'purchase' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.purchasesService.findOne(id);
  }

  @Mutation(() => Purchase)
  createPurchase(@Args('input') input: CreatePurchaseInput) {
    return this.purchasesService.create(input);
  }

  @Mutation(() => Purchase)
  updatePurchase(@Args('input') input: UpdatePurchaseInput) {
    return this.purchasesService.update(input);
  }

  @Mutation(() => DeletePurchase)
  deletePurchase(@Args('id') id: number) {
    return this.purchasesService.delete(id);
  }
}
