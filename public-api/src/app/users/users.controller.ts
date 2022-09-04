import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, map, Observable, of, switchMap } from 'rxjs';

import { User } from '../../../libs/api-interfaces';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  addUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string,
  ): Observable<User> {
    const saltOrRounds = 10;
    return from(bcrypt.hash(userPassword, saltOrRounds)).pipe(
      switchMap((hashedPassword) =>
        this.usersService.insertUser(userName, hashedPassword),
      ),
      map((result) => ({
        userId: result.id,
        userName: result.username,
      })),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): Observable<User> {
    return req.user;
  }

  @Post('/logout')
  logout(@Request() req): void {
    req.session.destroy();
  }

  @Get('/is-active')
  isActive(@Request() req): Observable<boolean> {
    return of(!!req.user);
  }
}
