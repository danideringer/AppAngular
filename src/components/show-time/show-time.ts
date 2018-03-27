import { Component } from '@angular/core';

/**
 * Generated class for the ShowTimeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'show-time',
  templateUrl: 'show-time.html'
})
export class ShowTimeComponent {

  text: string;

  constructor() {
    console.log('Hello ShowTimeComponent Component');
    this.text = 'Hello World';
  }

}
