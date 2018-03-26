import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationListPage } from './station-list';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    StationListPage
  ],
  imports: [
    IonicPageModule.forChild(StationListPage),
    ComponentsModule
  ],
})
export class StationListPageModule {}
