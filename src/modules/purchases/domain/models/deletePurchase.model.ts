import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletePurchase {
  @Field()
  message: string;

  @Field()
  success: boolean;
}
