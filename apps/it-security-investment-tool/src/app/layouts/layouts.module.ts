import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentWithIconComponent } from './content-with-icon/content-with-icon.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, SideBarComponent, ContentWithIconComponent],
  exports: [HeaderComponent, SideBarComponent, ContentWithIconComponent]
})
export class LayoutsModule { }
