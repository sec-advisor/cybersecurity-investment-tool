import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SideBarSection } from '../../layouts/action-sidebar/models/side-bar-button.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  sidebarSections!: SideBarSection[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.sidebarSections = this.getSidebarSections();
  }

  private getSidebarSections(): SideBarSection[] {
    return [
      {
        heading: { text: 'Gordon-Loeb Model', icon: 'bi-calculator' },
        buttons: [
          {
            text: 'Breach Probability Function',
            icon: 'bi-bar-chart',
            action: () => this.browseTo('bpf'),
          },
        ],
      },
    ];
  }

  private browseTo(url: string): void {
    this.router.navigate(['settings', url]);
  }
}
