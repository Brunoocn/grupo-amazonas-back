import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteAdress {
  @Field()
  message: string;

  @Field()
  success: boolean;
}
