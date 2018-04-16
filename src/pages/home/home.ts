import {
  Component, ViewChild, ElementRef, ComponentRef, ViewContainerRef, ComponentFactory, Renderer2 } from '@angular/core';
import { Events } from 'ionic-angular';
import { ListComponent } from '../../components/list/list';
import { FactoryComponentProvider } from '../../providers/factory-component/factory-component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  readonly COUNT_ELEMENTS_ON_PAGE: number = 10;
  readonly COUNT_ELEMENTS: number = 150;

  @ViewChild('listWrapper', { read: ViewContainerRef }) listWrapper: ViewContainerRef;
  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;

  data: number[] = [];
  list1: number[] = [];
  list2: number[] = [];
  page: number = 0;
  maxPage: number;
  directionDown: boolean = true;

  height: number = 0;
  mas: number[] = [0];

  listComponentFactory: ComponentFactory<any>;

  private listRef: ComponentRef<any>;

  constructor(public events: Events, public renderer: Renderer2, public factorySrv: FactoryComponentProvider) {

    this.events.subscribe('scroll: end', () => {
      if (this.page < 0) {
        this.page = 0;
        return;
      }

      if (!this.directionDown) {
        this.directionDown = true;
        this.page++;
      }
      this.page++;

      console.log('---------------------------------------------------------');
      console.log('page: ' + this.page);

      this.createComponent();
      // this.listRef.instance.onCalcHeight.subscribe( height => {
      //   this.mas.push(height);
      //   this.listRef.instance.offsetHeight = this.height;
      //   this.height += height;
      //   this.renderer.setStyle(this.scrollWrapper.nativeElement, 'height', this.height + 'px');
      // });

      if (this.page > 1) {
        console.log('delete FIRST list');
        this.listWrapper.remove(0)
      }

    });

    this.events.subscribe('scroll: start', () => {

      if (this.directionDown) {
        this.directionDown = false;
        this.page--;
      }
      this.page--;

      console.log('---------------------------------------------------------');
      console.log('page: ' + this.page);

      if (this.page >= 0) {

        this.createComponent(false);
        // this.listRef.instance.onCalcHeight.subscribe( height => {
        //   this.height -= this.mas[this.mas.length - 1];
        //   this.renderer.setStyle(this.scrollWrapper.nativeElement, 'height', this.height + 'px');
        //   this.mas.pop();
        //   this.listRef.instance.offsetHeight = this.mas.length == 2 ? 0 : this.height - this.mas[this.mas.length - 1] - this.mas[this.mas.length - 2];
        // });

        console.log('delete LAST list');
        this.listWrapper.remove(this.listWrapper.length - 1);
      }
    });

  }
  
  ionViewDidLoad() {
    for (let i = 0; i < this.COUNT_ELEMENTS; i++) this.data.push(i);
    this.maxPage = this.COUNT_ELEMENTS / this.COUNT_ELEMENTS_ON_PAGE;

    this.listComponentFactory = this.factorySrv.getComponentFactory('ListComponent');

    this.listRef = this.listWrapper.createComponent(this.listComponentFactory);
    this.listRef.instance.list = this.data.slice(this.page, this.COUNT_ELEMENTS_ON_PAGE);
    this.listRef.instance.scrollDown = true;
    this.listRef.instance.maxPage = this.maxPage;
    // this.listRef.instance.onCalcHeight.subscribe( height => {
    //   this.height += height;
    //   this.renderer.setStyle(this.scrollWrapper.nativeElement, 'height', this.height+"px");
    // });

  }

  createComponent(scrollDown: boolean = true) {
    this.listRef = this.listWrapper.createComponent(this.listComponentFactory, scrollDown ? undefined : 0);
    this.listRef.instance.list = this.data.slice(this.page * this.COUNT_ELEMENTS_ON_PAGE, (this.page + 1) * this.COUNT_ELEMENTS_ON_PAGE);
    this.listRef.instance.page = this.page;
    this.listRef.instance.maxPage = this.maxPage;
    this.listRef.instance.scrollDown = scrollDown;
  }

}
