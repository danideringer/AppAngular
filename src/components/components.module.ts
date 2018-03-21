import { NgModule } from '@angular/core';
import { GraphStationComponent } from './graph-station/graph-station';
import { TableStationComponent } from './table-station/table-station';
@NgModule({
	declarations: [GraphStationComponent,
    TableStationComponent],
	imports: [],
	exports: [GraphStationComponent,
    TableStationComponent]
})
export class ComponentsModule {}
