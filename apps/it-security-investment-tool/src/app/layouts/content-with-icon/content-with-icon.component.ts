import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-with-icon',
  templateUrl: './content-with-icon.component.html',
  styleUrls: ['./content-with-icon.component.scss']
})
export class ContentWithIconComponent implements OnInit {

  @Input() icon!: string;

  constructor() { }

  ngOnInit() {
  }

}
