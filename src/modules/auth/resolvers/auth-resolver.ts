import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';

import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { AuthResponse } from '../infra/models/register.model';
import { LoginInput } from '../infra/inputs/login.input';
import { User } from '../infra/models/user.model';
import { RegisterInput } from '../infra/inputs/register.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @SkipAuth()
  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return this.authService.register(input);
  }
}
