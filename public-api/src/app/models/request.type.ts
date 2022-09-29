import { User } from '@libs';
import { Request } from 'express';

export type UserRequest = Request & {
  user: User;
};
