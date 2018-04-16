import { NgModule } from '@angular/core';
import { ListComponent } from './list/list';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
	declarations: [ListComponent],
	imports: [
		IonicModule,
		DirectivesModule
	],
	entryComponents: [
		ListComponent
	],
	exports: [ListComponent]
})
export class ComponentsModule {}
