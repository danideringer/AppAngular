import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GraphStationComponent } from './graph-station/graph-station';
import { TableStationComponent } from './table-station/table-station';
import { GoogleMapComponent } from './google-map/google-map';
import { ShowTimeComponent } from './show-time/show-time';
import { SearchBarComponent } from './search-bar/search-bar';

@NgModule({
	declarations: [GraphStationComponent,
    TableStationComponent,
    GoogleMapComponent,
    ShowTimeComponent,
    SearchBarComponent],
	imports: [IonicModule],
	exports: [GraphStationComponent,
		TableStationComponent,
    GoogleMapComponent,
    ShowTimeComponent,
    SearchBarComponent]
})
export class ComponentsModule {}
