import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Address {
  @Field(() => ID)
  id: number;

  @Field()
  cep: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field(() => User)
  user: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
