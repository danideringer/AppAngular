import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GraphStationComponent } from './graph-station/graph-station';
import { TableStationComponent } from './table-station/table-station';
import { GoogleMapComponent } from './google-map/google-map';
import { ShowTimeComponent } from './show-time/show-time';
import { SearchBarComponent } from './search-bar/search-bar';
import { ForecastComponent } from './forecast/forecast';
import { GetForecastComponent } from './get-forecast/get-forecast';

@NgModule({
	declarations: [GraphStationComponent,
    TableStationComponent,
    GoogleMapComponent,
    ShowTimeComponent,
    SearchBarComponent,
    ForecastComponent,
    GetForecastComponent],
	imports: [IonicModule],
	exports: [GraphStationComponent,
		TableStationComponent,
    GoogleMapComponent,
    ShowTimeComponent,
    SearchBarComponent,
    ForecastComponent,
    GetForecastComponent]
})
export class ComponentsModule {}
