import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDTO {
  @Field()
  name: string;

  @Field()
  email: string;
}
