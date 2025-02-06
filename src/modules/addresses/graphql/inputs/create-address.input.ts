import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field()
  cep: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  number: string;

  @Field(() => Int)
  userId: number;
}
