import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressDTO {
  @Field()
  cep: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field(() => Int)
  userId: number;
}
