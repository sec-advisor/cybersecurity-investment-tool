import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  constructor(
    private router: Router,
    public routingService: RoutingService,
  ) {

  }
}
