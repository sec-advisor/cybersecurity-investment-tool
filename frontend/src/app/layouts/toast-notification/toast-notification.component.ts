import { Component, TemplateRef } from '@angular/core';

import { ToastNotificationService } from './services/toast-notification.service';

@Component({
  selector: 'app-toast-notification',
  styleUrls: ['app-toast-notification.scss'],
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[class.ngb-toasts]': 'true' },
})
export class ToastNotificationComponent {
  constructor(public toastService: ToastNotificationService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
