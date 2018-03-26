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
  series: any;

  constructor() {
  }
  
  ngOnChanges(changes: any) {
      if( changes && changes.data && changes.data.currentValue != undefined ) {
        this._data = this.data;
        this.createSeries();
        this.initChart();
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
        return [item.timestamp, +item.value];
    });
  }

  initChart(){
    HighCharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Representation of the ' + this._data.rangeGraph['name']
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
                headerFormat: '<b>{series.name}</b><br>'
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} '
        },
    
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
    
        series: this.series
        });
  }
}
