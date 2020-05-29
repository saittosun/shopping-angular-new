import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  // Message should be settable from outside so input()
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
