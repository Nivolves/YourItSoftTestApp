import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Admin } from '../../admins/entities/admin.entity';

export const GetAdmin = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Admin => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
