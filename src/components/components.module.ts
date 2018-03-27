import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GraphStationComponent } from './graph-station/graph-station';
import { TableStationComponent } from './table-station/table-station';
import { GoogleMapComponent } from './google-map/google-map';
import { ShowTimeComponent } from './show-time/show-time';

@NgModule({
	declarations: [GraphStationComponent,
    TableStationComponent,
    GoogleMapComponent,
    ShowTimeComponent],
	imports: [IonicModule],
	exports: [GraphStationComponent,
		TableStationComponent,
    GoogleMapComponent,
    ShowTimeComponent]
})
export class ComponentsModule {}
