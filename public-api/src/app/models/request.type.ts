import { Request } from 'express';

import { User } from '../../../libs/api-interfaces';

export type UserRequest = Request & {
  user: User;
};
