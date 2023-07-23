import { Component, OnInit } from '@angular/core';
import { BusinessProfile } from '@libs';
import { Observable, switchMap, tap } from 'rxjs';

import { RoutingService } from '../../services/routing.service';
import { StorageService } from '../../services/storage.service';
import { LoginService } from './login-modal/services/login.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  stream$!: Observable<{ profile?: BusinessProfile }>;

  constructor(
    private loginService: LoginService,
    private homeService: HomeService,
    private storageService: StorageService,
    public routingService: RoutingService,
  ) {}

  ngOnInit(): void {
    this.stream$ = this.getStream();
  }

  private getStream(): Observable<{ profile: BusinessProfile | undefined }> {
    return this.storageService.getLoggingState().pipe(
      switchMap((isLoggedIn) =>
        isLoggedIn
          ? this.homeService.getProfile()
          : this.loginService.showModal().pipe(
              switchMap(() => this.homeService.getProfile()),
              tap(() => this.storageService.setLoggingState(true)),
            ),
      ),
    );
  }
}
