import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly closeSubject$ = new Subject<void>();
  private readonly openSubject$ = new Subject<void>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  showModal(): Observable<void> {
    this.openSubject$.next();
    return this.closeSubject$;
  }

  getOpenModalEvent(): Observable<void> {
    return this.openSubject$;
  }

  modalWillClose(): void {
    this.closeSubject$.next();
  }
}
