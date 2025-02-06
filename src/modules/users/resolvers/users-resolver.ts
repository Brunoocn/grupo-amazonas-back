import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserInput } from '../graphql/inputs/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  getUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => Boolean) deleteUser(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.usersService.delete(id);
  }
}
