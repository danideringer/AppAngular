import { Component } from '@angular/core';

/**
 * Generated class for the VehicleStationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vehicle-station',
  templateUrl: 'vehicle-station.html'
})
export class VehicleStationComponent {

  text: string;

  constructor() {
    console.log('Hello VehicleStationComponent Component');
    this.text = 'Hello World';
  }

}
