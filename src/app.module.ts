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

import { Address } from './modules/addresses/infra/entities/adress.entity';
import { Purchase } from './modules/purchases/infra/entities/purchase.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PluralNamingStrategy } from './config/plural-naming.strategy';
import { User } from './modules/auth/domain/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
    AdressesModule,
    PurchasesModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_DATABASE_HOST,
      port: parseInt(process.env.PG_DATABASE_PORT),
      username: process.env.PG_DATABASE_USER,
      password: process.env.PG_DATABASE_PASSWORD,
      database: process.env.PG_DATABASE_NAME,
      entities: [User, Address, Purchase],
      synchronize: true,
      namingStrategy: new PluralNamingStrategy(),
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
