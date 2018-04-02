import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GraphStationComponent } from './graph-station/graph-station';
import { TableStationComponent } from './table-station/table-station';
import { GoogleMapComponent } from './google-map/google-map';
import { ShowTimeComponent } from './show-time/show-time';
import { VehicleStationComponent } from './vehicle-station/vehicle-station';
import { WeatherStationComponent } from './weather-station/weather-station';
import { SearchBarComponent } from './search-bar/search-bar';

@NgModule({
	declarations: [GraphStationComponent,
    TableStationComponent,
    GoogleMapComponent,
    ShowTimeComponent,
    VehicleStationComponent,
    WeatherStationComponent,
    SearchBarComponent],
	imports: [IonicModule],
	exports: [GraphStationComponent,
		TableStationComponent,
    GoogleMapComponent,
    ShowTimeComponent,
    VehicleStationComponent,
    WeatherStationComponent,
    SearchBarComponent]
})
export class ComponentsModule {}
