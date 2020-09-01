// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from 'src/auth/user.entity';

// export const GetUser = createParamDecorator(
//   (data: unknown, req: ExecutionContext): User => {
//     const request = req.switchToHttp().getRequest();
//     console.log(request);
//     return request.user;
//   },
// );

import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, req): User => {
    return req.user;
  },
);
