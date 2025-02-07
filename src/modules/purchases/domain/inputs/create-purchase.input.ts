import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field(() => Float)
  totalAmount: number;

  @Field(() => Date)
  purchaseDate: Date;

  @Field(() => Int)
  userId: number;
}
