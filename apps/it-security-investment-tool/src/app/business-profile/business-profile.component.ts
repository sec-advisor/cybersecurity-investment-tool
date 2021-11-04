import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BusinessProfileDataService } from '../services/business-profile-data.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {

  readonly form = this.formBuilder.group({
    company: [undefined, [Validators.required]],
    revenue: [undefined, [Validators.required, Validators.min(0)]],
    employees: [undefined, [Validators.required, Validators.min(0)]],
    region: [undefined, [Validators.required]],
  })
  readonly regions = [
    { key: 'westernEuropa', value: 'Western Europe' },
    { key: 'centralEasternEuropa', value: 'Central and Eastern Europa' },
    { key: 'asia', value: 'Asia' },
    { key: 'africa', value: 'Western Europe' },
    { key: 'middleEast', value: 'Mediterranean & Middle East' },
    { key: 'western-europa', value: 'Western Europe' },
  ]

  constructor(private formBuilder: FormBuilder, private businessProfileDataService: BusinessProfileDataService) { }

  ngOnInit() {
  }

  save(): void {
    this.businessProfileDataService.storeData({
      companyName: this.form.get('company')?.value,
      revenue: this.form.get('revenue')?.value,
      numberOfEmployees: this.form.get('employees')?.value,
      region: this.form.get('region')?.value
    }).subscribe(console.log)
  }

}
