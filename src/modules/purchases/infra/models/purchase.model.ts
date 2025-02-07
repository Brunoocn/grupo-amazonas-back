import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/auth/infra/models/user.model';

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: number;

  @Field()
  totalAmount: number;

  @Field()
  purchaseDate: Date;

  @Field(() => User)
  user: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
