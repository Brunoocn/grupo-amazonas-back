import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';

import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { AuthResponse } from '../domain/models/register.model';
import { RegisterInput } from '../domain/inputs/register.input';
import { User } from '../domain/models/user.model';
import { LoginInput } from '../domain/inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput) {
    return this.authService.login({
      email: input.email,
      password: input.password,
    });
  }

  @SkipAuth()
  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    console.log(input, 'register');
    return this.authService.register(input);
  }
}
