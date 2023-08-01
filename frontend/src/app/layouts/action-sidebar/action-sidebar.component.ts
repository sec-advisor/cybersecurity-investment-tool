import { Component, Input, OnInit } from '@angular/core';

import { StorageKey } from '../../models/storage-key.enum';
import { LocalStorageService } from '../../services/local-storage.service';
import { SideBarButton, SideBarSection } from './models/side-bar-button.model';

@Component({
  selector: 'app-action-sidebar',
  templateUrl: './action-sidebar.component.html',
  styleUrls: ['./action-sidebar.component.scss'],
})
export class ActionSidebarComponent implements OnInit {
  isCollapsed = false;

  @Input() sections?: SideBarSection[];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.isCollapsed =
      this.localStorageService.getItem(StorageKey.IsMenuBarCollapsed) ===
      'true';
  }

  execute(button: SideBarButton): void {
    button.action();
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.localStorageService.setItem(
      StorageKey.IsMenuBarCollapsed,
      this.isCollapsed,
    );
  }
}
