import { Injectable, Type, ComponentFactoryResolver, ComponentFactory } from '@angular/core';


@Injectable()
export class FactoryComponentProvider {

  factories: any;

  constructor(private resolver: ComponentFactoryResolver) {

    console.log('Init FactoryComponentProvider');

    this.factories = Array.from(this.resolver['_factories'].keys());

  }

  /**
   * Searches for a component by name and returns its factory
   * @param nameComponent
   * @returns {ComponentFactory<T>}
   */
  getComponentFactory(nameComponent: string): ComponentFactory<any> {

    const factoryClass = <Type<any>> this.factories.find((factory: any) => factory.name === nameComponent);

    return this.resolver.resolveComponentFactory(factoryClass);
  }

}
