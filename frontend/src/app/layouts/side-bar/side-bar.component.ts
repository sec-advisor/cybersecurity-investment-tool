import { Component } from '@angular/core';
import { map } from 'rxjs';

import { RoutingService } from '../../services/routing.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  readonly companyName$ = this.storageService
    .getBusinessProfile()
    .pipe(map((profile) => profile?.companyName));

  constructor(
    public storageService: StorageService,
    public routingService: RoutingService
  ) {}
}
