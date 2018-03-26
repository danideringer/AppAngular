import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GraphStationComponent } from './graph-station/graph-station';
import { TableStationComponent } from './table-station/table-station';
import { GoogleMapComponent } from './google-map/google-map';

@NgModule({
	declarations: [GraphStationComponent,
    TableStationComponent,
    GoogleMapComponent],
	imports: [IonicModule],
	exports: [GraphStationComponent,
		TableStationComponent,
    GoogleMapComponent]
})
export class ComponentsModule {}
