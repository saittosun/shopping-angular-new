import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  // we have to attach something to this property to make it listenable from the parent component, @output enables us to use this event or to listen to it from the parent component.
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
