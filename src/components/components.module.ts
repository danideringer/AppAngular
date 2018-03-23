import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GraphStationComponent } from './graph-station/graph-station';
import { TableStationComponent } from './table-station/table-station';

@NgModule({
	declarations: [GraphStationComponent,
    TableStationComponent],
	imports: [IonicModule],
	exports: [GraphStationComponent,
		TableStationComponent]
})
export class ComponentsModule {}
