import { Component, Input, OnChanges} from '@angular/core';
import * as HighCharts from 'highcharts';

/**
 * Generated class for the HeroGraphicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'graph-station',
  templateUrl: 'graph-station.html'
})
export class GraphStationComponent implements OnChanges {
  _data: any;
  @Input()
  data: any;

  constructor() {
  }
  
  ngOnChanges(changes: any) {
      if( changes && changes.data && changes.data.currentValue != undefined ) {
        console.log("aaddd");
        this._data = this.data;
      }

      if( this._data ) {
          this.initChart();
      }
  }

  initChart(){
    console.log(this._data);
    HighCharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Snow depth at Vikjafjellet, Norway'
        },
        subtitle: {
            text: 'Irregular time data in Highcharts JS'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Snow depth (m)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
    
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
    
        series: [{
            name: 'Hola',
            data: this._data['values'].map((item) => {
               // console.log([item.timestamp, item.value]);
                return [item.timestamp, +item.value];
            })
            }, 
        ]
        });
  }
}
