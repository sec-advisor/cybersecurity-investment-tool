import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessProfile } from '@app/api-interfaces';
import { map, merge, Observable, of, Subject, switchMap, tap } from 'rxjs';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {

  readonly reloadProfile$ = new Subject<void>();
  isEditMode = false;
  stream$!: Observable<{ form: FormGroup, profileId: string | undefined }>;
  readonly regions = [
    { key: 'westernEuropa', value: 'Western Europe' },
    { key: 'centralEasternEuropa', value: 'Central and Eastern Europa' },
    { key: 'asia', value: 'Asia' },
    { key: 'africa', value: 'Western Europe' },
    { key: 'middleEast', value: 'Mediterranean & Middle East' },
    { key: 'western-europa', value: 'Western Europe' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.stream$ = merge(
      of({}),
      this.reloadProfile$
    ).pipe(
      switchMap(() => this.storageService.getBusinessProfile()),
      map(profile => ({
        form: this.formBuilder.group({
          company: [profile?.companyName, [Validators.required]],
          revenue: [profile?.revenue, [Validators.required, Validators.min(1)]],
          employees: [profile?.numberOfEmployees, [Validators.required, Validators.min(1)]],
          region: [this.getRegionKey(profile?.region), [Validators.required]],
        }),
        profile
      })),
      tap(stream => {
        if (stream.profile) {
          stream.form.disable();
        }
      }),
      map(stream => ({
        form: stream.form,
        profileId: stream.profile?.id
      }))
    )
  }

  save(form: FormGroup): void {
    const profile = this.getProfileFromForm(form);
    if (profile) {
      this.storageService.storeBusinessProfile(profile as BusinessProfile).subscribe();
    } else {
      // TODO CH: Handle error
      console.error('Invalid business profile parameter')
    }
  }

  edit(form: FormGroup): void {
    form.enable();
    form.markAsPristine();
    this.isEditMode = true;
  }

  cancel(form: FormGroup): void {
    this.isEditMode = false;
    form.disable();
    this.reloadProfile$.next();
  }

  update(form: FormGroup, profileId: string | undefined): void {
    const profile = this.getProfileFromForm(form);

    if (profile) {
      this.storageService.updateBusinessProfile({ ...profile, id: profileId }).pipe(
        tap(() => {
          this.isEditMode = false;
          form.disable();
        })
      ).subscribe();
    } else {
      // TODO CH: Handle error
      console.error('Invalid business profile parameter')
    }
  }


  private getRegionKey(region: string | undefined): string | undefined {
    return region ? this.regions.find(r => r.value = region)?.key : undefined;
  }

  private getProfileFromForm(form: FormGroup): BusinessProfile | undefined {
    const profile = {
      companyName: form.get('company')?.value,
      revenue: form.get('revenue')?.value,
      numberOfEmployees: form.get('employees')?.value,
      region: this.regions.find(region => region.key === form.get('region')?.value)?.value as string,
    }
    return Object.values(profile).every(value => value !== undefined) ? profile : undefined;
  }
}
