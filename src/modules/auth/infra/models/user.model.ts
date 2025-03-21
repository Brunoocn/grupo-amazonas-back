import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Address } from 'src/modules/addresses/infra/models/adress.model';
import { Purchase } from 'src/modules/purchases/infra/models/purchase.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Address], { nullable: true })
  addresses?: Address[];

  @Field(() => [Purchase], { nullable: true })
  purchases?: Purchase[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
