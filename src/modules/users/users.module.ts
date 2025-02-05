import { Module } from '@nestjs/common';
import { UsersService } from './services/user.service';
import { UsersResolver } from './resolvers/user-resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
