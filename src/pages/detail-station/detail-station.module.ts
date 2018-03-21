import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailStationPage } from './detail-station';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    DetailStationPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailStationPage), ComponentsModule
    
  ],
})
export class DetailStationPageModule {}
