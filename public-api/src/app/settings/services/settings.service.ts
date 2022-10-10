import { AppSetting } from '@libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('settings')
    private readonly settingsModel: Model<AppSetting>,
  ) {}

  get(userId: string): Observable<AppSetting | undefined> {
    return from(this.settingsModel.find({ userId }).exec()).pipe(
      map((models) => (models.length > 0 ? { bpf: models[0].bpf } : undefined)),
    );
  }

  reset(userId: string): Observable<void> {
    return from(this.settingsModel.find({ userId }).exec()).pipe(
      switchMap((models) =>
        models.length > 0 ? models[0].remove() : of(undefined),
      ),
      map(() => undefined),
    );
  }

  save(settings: AppSetting, userId: string): Observable<AppSetting> {
    return from(this.settingsModel.find({ userId }).exec()).pipe(
      switchMap((models) => {
        if (models.length > 0) {
          const model = models[0];
          model.bpf = settings.bpf;
          return from(model.save());
        } else {
          return from(new this.settingsModel({ ...settings, userId }).save());
        }
      }),
      map((x) => ({ bpf: x.bpf })),
    );
  }
}
