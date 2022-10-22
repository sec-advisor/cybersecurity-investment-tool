import { AppSetting } from '@libs';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { catchError, Observable, of, tap } from 'rxjs';

import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { UserRequest } from '../models/request.type';
import { SettingsService } from './services/settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('save')
  save(
    @Request() request: UserRequest,
    @Body() body: AppSetting,
  ): Observable<AppSetting> {
    return this.settingsService.save(body, request.user.userId).pipe(
      catchError(() =>
        of(undefined).pipe(
          tap(() => {
            throw new HttpException(
              'Save settings failed!',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      ),
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post('reset')
  reset(@Request() request: UserRequest): Observable<void> {
    return this.settingsService.reset(request.user.userId).pipe(
      catchError(() =>
        of(undefined).pipe(
          tap(() => {
            throw new HttpException(
              'Reset failed!',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      ),
    );
  }
}
