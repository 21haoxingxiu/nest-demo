import {
  ExecutionContext,
  SetMetadata,
  Controller,
  createParamDecorator,
} from '@nestjs/common';

import { Request } from 'express';

export const Aaa = (...args: string[]) => {
  console.log('-----', args);
  return SetMetadata('aaa', args);
};

export const AaaCtr = () => Controller('aaa');

export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc';
  },
);

export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.query[key];
  },
);
