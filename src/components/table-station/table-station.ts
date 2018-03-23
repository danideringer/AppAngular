import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import * as moment from 'moment';
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
  _data: any;
  series: any;

  @Input()
  data: any;
  
  constructor() {
  }

  ngOnChanges(changes: any) {
    if( changes && changes.data && changes.data.currentValue != undefined ) {
      this._data = this.data;
      this.createSeries();
     // this.initChart();
    }
  } 

  createSeries() {
    this.series = this._data.variables.map((item) => {
        return {
            name: item.name,
            symbols: item.symbol,
            data: this.getDataOfSerie(item.values)
        }
    })
    console.log(this.series)
  }

  getDataOfSerie(values) {
    return values.map((item) => {
        return {
          timestamp: moment.unix(item.timestamp).format("MM/DD/YYYY"), 
          value: +item.value
        }
    });
  }
}
