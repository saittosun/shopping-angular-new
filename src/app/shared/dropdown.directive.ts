import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  private isOpen = false;
  @HostListener('click') toggleOpen() {
    const elem = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(elem, 'show');
    } else {
      this.renderer.removeClass(elem, 'show');
    }
  }
}
