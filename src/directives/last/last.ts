import { Directive, Output, Input, EventEmitter } from '@angular/core';

@Directive({
  selector: '[lastFor]' // Attribute selector
})
export class LastDirective {

  @Output() last = new EventEmitter();

  @Input()
  set ready(isReady: boolean) {
    if (isReady) {
      this.last.emit();
    }
  }
}
