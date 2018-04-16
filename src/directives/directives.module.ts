import { NgModule } from '@angular/core';
import { LastDirective } from './last/last';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [LastDirective],
	imports: [
		IonicModule
	],
	exports: [LastDirective]
})
export class DirectivesModule {}
