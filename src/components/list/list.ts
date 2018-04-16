import { Component, Input, ElementRef, ViewChild, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListComponent implements OnInit, OnDestroy {

  readonly BUFFER: number = 2;

  @ViewChild('wrapper') wrapper: ElementRef;
  @Output() onCalcHeight = new EventEmitter();
  @ViewChild('sentinelStart') el1: ElementRef;
  @ViewChild('sentinelFinish') el2: ElementRef;

  @Input() scrollDown: boolean;
  @Input() page: number;
  @Input() maxPage: number;

  ioDown: IntersectionObserver;
  ioUp: IntersectionObserver;

  private _list: number[];
  get list(): number[] {
    return this._list;
  }
  @Input()
  set list(value: number[]) {

    this.bufferUp = value.slice(0, this.BUFFER);
    this.bufferDown = value.slice(value.length - this.BUFFER);
    this._list = value.slice(this.BUFFER, value.length - this.BUFFER);
  }
  bufferUp: number[];
  bufferDown: number[];

  // private _offsetHeight: number;
  // get offsetHeight(): number {
  //   return this._offsetHeight;
  // }
  // @Input()
  // set offsetHeight(value: number) {
  //   if (value) {
  //     this._offsetHeight = value;
  //     this.el.nativeElement.style.transform = 'translateY(' + this._offsetHeight + 'px)';
  //   }
  // }

  constructor(public el: ElementRef, public events: Events) {
    console.log('Init ListComponent');

    this.ioDown = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          this.scrollDown = false;
          this.events.publish('scroll: end');
        }
      },
      { }
    );

    this.ioUp = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          this.scrollDown = true;
          this.events.publish('scroll: start')
        }
      },
      { }
    );

  }

  ngOnInit() {
    this.ioDown.observe(this.el2.nativeElement);
    this.ioUp.observe(this.el1.nativeElement);
  }

  onLast() {
    // setTimeout(() => {
    //   this.onCalcHeight.emit(this.wrapper.nativeElement.offsetHeight);
    // }, 50);
  }

  ngOnDestroy() {
    this.ioDown.unobserve(this.el2.nativeElement);
    this.ioUp.unobserve(this.el1.nativeElement);
    this.ioDown.disconnect();
    this.ioUp.disconnect();
    console.log('DESTROY COMPONENT');
  }


}
