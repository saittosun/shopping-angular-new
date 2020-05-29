// tslint:disable-next-line:max-line-length
// Angular needs a view container ref which you might remember from the directives deep dive section. A view container ref is essentially an object managed internally by Angular, which gives Angular a reference, a pointer to a place in the DOM you could say, with which it can interact and this object has more than just like the coordinates where it sits, it has methods like "hey, please create a component here" and we need something like this. Now to get access to such a view container reference, there is a nice trick or actually not a hack, it's the official approach for getting access to it, we can create a helper directive.
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  // tslint:disable-next-line:max-line-length
  //  this will allow you to get information about the place where you use the directive and as I said, that will not just be coordinates but the view container ref has useful methods, for example for creating a component, in that place where it sits.
  // tslint:disable-next-line:max-line-length
  // this property is publicly accessible, so that we can access that view container ref from outside. Now why do we need that? Because now, we will be able to add the directive to some place in our DOM, in our templates and then get access to it with @ViewChild and then get access to the public view container ref to work with that view container ref of that directive.
  constructor(public viewContainerRef: ViewContainerRef) { }

}
