import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/auth/domain/models/user.model';

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

  @Field()
  number: string;

  @Field(() => User)
  user: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
