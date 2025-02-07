import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './resolvers/auth-resolver';
import { JwtService } from '@nestjs/jwt';
import { User } from './infra/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthResolver, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
