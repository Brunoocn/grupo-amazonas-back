import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AdressesModule } from './modules/addresses/adresses.module';
import { PurchasesModule } from './modules/purchases/purchases.module';

import { APP_GUARD } from '@nestjs/core';

import { JwtStrategy } from './common/guards/jwt-guard/jwt.strategy';

import { JwtGuard } from './common/guards/jwt-guard/jwt.guard';
import { AuthModule } from './modules/auth/auth.module';

import { User } from './modules/auth/infra/entities/user.entity';
import { Address } from './modules/addresses/infra/entities/adress.entity';
import { Purchase } from './modules/purchases/infra/entities/purchase.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
    AdressesModule,
    PurchasesModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Address, Purchase],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
