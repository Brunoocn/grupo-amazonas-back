import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from 'src/common/decorators/skip-auth.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  // constructor(private reflector: Reflector) {
  //   super();
  // }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);

  //   if (isPublic) {
  //     return true;
  //   }

  //   const ctx = GqlExecutionContext.create(context);
  //   const request = ctx.getContext().req;
  //   console.log(request, 'request');
  //   if (!request) {
  //     throw new UnauthorizedException('Request object not found in context.');
  //   }

  //   console.log(typeof ctx, 'type');
  //   const teste = ctx.getContext();
  //   console.log(typeof teste, 'teste type');
  //   return super.canActivate(request);
  // }

  // handleRequest(err, user) {
  //   if (err) {
  //     throw new UnauthorizedException('Unauthorized');
  //   }

  //   if (!user) {
  //     console.log('caiu aqui');
  //     return;
  //   }
  //   return user;
  // }
}
