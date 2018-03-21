import { Component, Input, OnChanges } from '@angular/core';
import * as HighCharts from 'highcharts';
/**
 * Generated class for the GraphStationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'graph-station',
  templateUrl: 'graph-station.html'
})
export class GraphStationComponent {

  @Input()
  data: any;

  constructor() {
  }

  ngOnChanges(changes: any) {
      if( changes.data.currentValue != undefined ) {
        this.initChart();
      }
  }

  initChart(){
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
                text: 'Value'
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
            name: 'hola',
            //data: this.data['wins'].map((item) => {
            //    return [item.date, item.value];
            //})
            }, {
            name: 'Loses',

        }
        ]
        });
  }

}
