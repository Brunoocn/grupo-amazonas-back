import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field(() => Float)
  totalAmount: number;

  @Field()
  purchaseDate: string;

  @Field(() => Int)
  userId: number;
}
