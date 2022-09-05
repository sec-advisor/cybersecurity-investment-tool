import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { catchError, Observable, of, tap } from 'rxjs';

import { BusinessProfile, User } from '../../../libs/api-interfaces';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { BusinessProfileService } from './services/business-profile.service';

@Controller('business-profiles')
export class BusinessProfileController {
  constructor(private businessProfileService: BusinessProfileService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('profiles')
  storeProfile(
    @Request() req,
    @Body() profile: BusinessProfile,
  ): Observable<string> {
    try {
      const user = req.user as User;
      profile.userId = user.userId;
      return this.businessProfileService.storeProfile(profile).pipe(
        catchError(() =>
          of({} as string).pipe(
            tap(() => {
              throw new HttpException(
                'Store business profile failed!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Store business profile failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('user')
  getProfileId(@Request() req): Observable<string | undefined> {
    const user = req.user as User;
    if (user.userId) {
      try {
        return this.businessProfileService
          .getProfileByUser(user.userId)
          .pipe(catchError(() => of(undefined)));
      } catch (error) {
        return of(undefined);
      }
    } else {
      return of(undefined);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profiles/:id')
  getProfile(@Param('id') id: string): Observable<BusinessProfile> {
    try {
      return this.businessProfileService.getProfile(id).pipe(
        catchError(() =>
          of({} as BusinessProfile).pipe(
            tap(() => {
              throw new HttpException(
                'Invalid profile id!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Invalid profile id!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('profiles')
  updateBusinessProfile(
    @Body() profile: BusinessProfile,
  ): Observable<BusinessProfile> {
    try {
      return this.businessProfileService.updateProfile(profile).pipe(
        catchError(() =>
          of({} as BusinessProfile).pipe(
            tap(() => {
              throw new HttpException(
                'Update business profile failed!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Update business profile failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
