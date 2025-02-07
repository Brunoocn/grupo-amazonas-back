import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePurchaseInput } from './create-purchase.input';

@InputType()
export class UpdatePurchaseInput extends PartialType(CreatePurchaseInput) {
  @Field(() => Int)
  id: number;
}
