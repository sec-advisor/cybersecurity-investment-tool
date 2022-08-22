import { BusinessProfile } from '@app/api-interfaces';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { catchError, Observable, of, tap } from 'rxjs';

import { BusinessProfileService } from './services/business-profile.service';

@Controller('business-profiles')
export class BusinessProfileController {

  constructor(private businessProfileService: BusinessProfileService) { }

  @Post('profiles')
  storeProfile(@Body() profile: BusinessProfile): Observable<string> {
    try {
      return this.businessProfileService.storeProfile(profile).pipe(
        catchError(() => of({} as string).pipe(
          tap(() => { throw new HttpException('Store business profile failed!', HttpStatus.INTERNAL_SERVER_ERROR) })))
      );;
    } catch (error) {
      throw new HttpException('Store business profile failed!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('profiles/:id')
  getProfile(@Param('id') id: string): Observable<BusinessProfile> {
    try {
      return this.businessProfileService.getProfile(id).pipe(
        catchError(() => of({} as BusinessProfile).pipe(
          tap(() => { throw new HttpException('Invalid profile id!', HttpStatus.INTERNAL_SERVER_ERROR) })))
      );
    } catch (error) {
      throw new HttpException('Invalid profile id!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('profiles')
  updateBusinessProfile(@Body() profile: BusinessProfile): Observable<BusinessProfile> {
    try {
      return this.businessProfileService.updateProfile(profile).pipe(
        catchError(() => of({} as BusinessProfile).pipe(
          tap(() => { throw new HttpException('Update business profile failed!', HttpStatus.INTERNAL_SERVER_ERROR) })))
      );;
    } catch (error) {
      throw new HttpException('Update business profile failed!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
