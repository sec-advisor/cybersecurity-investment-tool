import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danger-modal',
  templateUrl: './danger-modal.component.html',
  styleUrls: ['./danger-modal.component.scss'],
})
export class DangerModalComponent {
  constructor(public modal: NgbActiveModal) {}
}
