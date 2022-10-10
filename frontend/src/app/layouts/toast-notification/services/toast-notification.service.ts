import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  toasts: any[] = [];

  showSuccess(text: string) {
    this.show(text, { classname: 'bg-success text-light', delay: 2500 });
  }

  showDanger(text: string) {
    this.show(text, { classname: 'bg-danger text-light', delay: 2500 });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
}
