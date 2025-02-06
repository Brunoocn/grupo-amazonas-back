import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: number;

  @Field()
  totalAmount: number;

  @Field()
  purchaseDate: Date;

  @Field()
  user: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
