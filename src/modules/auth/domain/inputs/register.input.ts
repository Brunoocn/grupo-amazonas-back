import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  password: string;
}
