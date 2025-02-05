import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAddressDTO } from './create-address.dto';

@InputType()
export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {
  @Field(() => Int)
  id: number;
}
