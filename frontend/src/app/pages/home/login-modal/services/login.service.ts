import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, from, merge, Observable, Subject } from 'rxjs';

import { LoginModalComponent } from '../login-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly closeSubject$ = new Subject<void>();
  private readonly openSubject$ = new Subject<void>();

  constructor(private modalService: NgbModal) {}

  showModal(): Observable<void> {
    return merge(
      this.openModal().pipe(filter(() => false)),
      this.closeSubject$,
    );
  }

  getOpenModalEvent(): Observable<void> {
    return this.openSubject$;
  }

  modalWillClose(): void {
    this.closeSubject$.next();
  }

  private openModal(): Observable<any> {
    return from(
      this.modalService.open(LoginModalComponent, {
        backdrop: 'static',
        keyboard: false,
        centered: true,
      }).result,
    );
  }
}
