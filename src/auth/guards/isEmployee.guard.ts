import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class isEmployee implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user=ctx.getContext().req.user;
    console.log(user);
    console.log(user);
    if(!user || !user.department){
        throw new UnauthorizedException("Only employees can access this data")
    }
    return true;
  }

}
