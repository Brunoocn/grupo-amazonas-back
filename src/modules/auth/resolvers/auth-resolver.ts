import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../graphql/inputs/login.input';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { AuthResponse } from '../graphql/models/register.model';
import { RegisterInput } from '../graphql/inputs/register.input';
import { User } from '../graphql/models/user.model';

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
    return this.authService.register(input);
  }
}
