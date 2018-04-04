import { Component, Input } from '@angular/core';
import { ApiProvider } from './../../providers/api/api';
import * as moment from 'moment';

/**
 * Generated class for the ForecastComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'forecast',
  templateUrl: 'forecast.html'
})

export class ForecastComponent {
  cityCode: any;
  dailyForecast: any;
  @Input()
  latitude: any;
  @Input()
  longitude: any;

  constructor(private apiProv: ApiProvider) {
  }
  
  ngAfterViewInit(){
    this.apiProv.getCityAccuweather(this.latitude, this.longitude)
    .subscribe(data => {
      this.cityCode = data;
      this.apiProv.getForecastDays(this.cityCode['Key'])
        .subscribe(data => {
          this.dailyForecast = data;
          console.log(this.dailyForecast)
        })
    })    
  }

  getFormatDate(date:any){
    return moment(date).format("MM/DD/YYYY") + " " + moment(date).format("dddd") 
  }

}
