import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContentWithIconComponent } from './content-with-icon/content-with-icon.component';
import { DangerModalComponent } from './danger-modal/danger-modal.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ToastNotificationService } from './toast-notification/services/toast-notification.service';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';

@NgModule({
  imports: [CommonModule, NgbModule],
  declarations: [
    HeaderComponent,
    SideBarComponent,
    ContentWithIconComponent,
    DangerModalComponent,
    ToastNotificationComponent,
  ],
  providers: [ToastNotificationService],
  exports: [
    HeaderComponent,
    SideBarComponent,
    ContentWithIconComponent,
    ToastNotificationComponent,
  ],
})
export class LayoutsModule {}
