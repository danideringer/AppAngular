import { Component } from '@angular/core';

/**
 * Generated class for the TableStationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'table-station',
  templateUrl: 'table-station.html'
})
export class TableStationComponent {

  text: string;

  constructor() {
    console.log('Hello TableStationComponent Component');
    this.text = 'Hello World';
  }

}
