/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToastNotificationService } from './toast-notification.service';

describe('Service: ToastNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastNotificationService]
    });
  });

  it('should ...', inject([ToastNotificationService], (service: ToastNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
