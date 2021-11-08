import { Component, OnInit } from '@angular/core';
import { BusinessProfile } from '@app/api-interfaces';
import { Observable } from 'rxjs';

import { RoutingService } from '../services/routing.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stream$!: Observable<{ profile: BusinessProfile | undefined }>

  constructor(
    public homeService: HomeService,
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.stream$ = this.homeService.getProfile();
    console.log('on')
  }
}
