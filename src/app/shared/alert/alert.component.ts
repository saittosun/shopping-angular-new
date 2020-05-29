import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  // Message should be settable from outside so input()
  @Input() message: string;
  // tslint:disable-next-line:max-line-length
  // we make the event listenable from outside. That event emitter could now also transport some data but here I'll actually add void as a type because I won't emit any data, I'll just emit the "hey this was closed" event.
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
