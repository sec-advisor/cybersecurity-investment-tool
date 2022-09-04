import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, map, switchMap } from 'rxjs';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  validateUser(username: string, password: string) {
    return this.usersService.getUser(username).pipe(
      switchMap((user) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((passwordValid) => ({ passwordValid, user })),
        ),
      ),
      map(({ passwordValid, user }) => {
        if (!user) {
          throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
          return {
            userId: user.id,
            userName: user.username,
          };
        }
        return null;
      }),
    );
  }
}
