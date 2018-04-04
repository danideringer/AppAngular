import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomTimePage } from './custom-time';

@NgModule({
  declarations: [
    CustomTimePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomTimePage),
  ],
})
export class CustomTimePageModule {}
