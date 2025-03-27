import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsEmployee implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    console.log(user);
    if (!user || !user.employment_status) {
      throw new ForbiddenException(
        'Only Employees have the access to the data',
      );
    }
    return true;
  }
}
