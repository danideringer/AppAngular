import { Component } from '@angular/core';

/**
 * Generated class for the WeatherStationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'weather-station',
  templateUrl: 'weather-station.html'
})
export class WeatherStationComponent {

  text: string;

  constructor() {
    console.log('Hello WeatherStationComponent Component');
    this.text = 'Hello World';
  }

}
