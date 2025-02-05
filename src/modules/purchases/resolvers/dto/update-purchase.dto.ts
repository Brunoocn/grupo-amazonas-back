import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePurchaseDTO } from './create-purchase.dto';

@InputType()
export class UpdatePurchaseDTO extends PartialType(CreatePurchaseDTO) {
  @Field(() => Int)
  id: number;
}
