import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { PurchasesService } from '../services/purchases.service';
import { CreatePurchaseInput } from '../graphql/inputs/create-purchase.input';
import { UpdatePurchaseInput } from '../graphql/inputs/update-purchase.input';
import { Purchase } from '../graphql/models/purchase.model';
import { DeletePurchase } from '../graphql/models/deletePurchase.model';

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
    return this.purchasesService.update(input.id, input);
  }

  @Mutation(() => DeletePurchase)
  deletePurchase(@Args('id', { type: () => Number }) id: number) {
    return this.purchasesService.delete(id);
  }
}
