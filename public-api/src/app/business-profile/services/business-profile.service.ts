import { BusinessProfile } from '@libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class BusinessProfileService {
  constructor(
    @InjectModel('business-profile')
    private readonly profileModel: Model<BusinessProfile>,
  ) {}

  storeProfile(profile: BusinessProfile): Observable<string> {
    // TODO CH: fix me
    // @ts-ignore
    return from(new this.profileModel(profile).save()).pipe(
      map((value) => value._id),
    );
  }

  getProfileByUser(userId: string): Observable<string> {
    return from(this.profileModel.find({ userId })).pipe(
      map((profile) => profile[0]?._id),
    );
  }

  getProfile(id: string): Observable<BusinessProfile> {
    return from(this.profileModel.findById(id)).pipe(
      map((profile) => this.mapToBusinessProfile(profile)),
    );
  }

  updateProfile(profile: BusinessProfile): Observable<BusinessProfile> {
    return from(this.profileModel.findById(profile.id).exec()).pipe(
      tap((model) => {
        model.companyName = profile.companyName || model.companyName;
        model.revenue = profile.revenue || model.revenue;
        model.numberOfEmployees =
          profile.numberOfEmployees || model.numberOfEmployees;
        model.region = profile.region || model.region;
      }),
      switchMap((model) => from(model.save())),
      map((model) => this.mapToBusinessProfile(model)),
    );
  }

  private mapToBusinessProfile(profile): BusinessProfile {
    return {
      id: profile._id,
      userId: undefined,
      companyName: profile.companyName,
      revenue: profile.revenue,
      numberOfEmployees: profile.numberOfEmployees,
      region: profile.region,
    };
  }
}
