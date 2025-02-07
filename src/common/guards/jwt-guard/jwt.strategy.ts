import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (req?.headers?.authorization) {
          return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid JWT payload');
    }

    return {
      userId: payload.id,
      email: payload.email,
      name: payload.name,
    };
  }

  static extractJwtFromContext(context: ExecutionContext): string | null {
    const ctx = GqlExecutionContext.create(context);
    const request =
      ctx.getContext()?.req || context.switchToHttp().getRequest<Request>();

    if (request?.headers?.authorization) {
      return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    }
    return null;
  }
}
