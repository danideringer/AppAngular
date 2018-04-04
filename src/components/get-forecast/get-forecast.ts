import { Component, Input } from '@angular/core';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the GetForecastComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'get-forecast',
  templateUrl: 'get-forecast.html'
})
export class GetForecastComponent {

  cityCode: any;
  hourlyForecast: any;
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
        this.apiProv.getForecastHourly(this.cityCode['Key'])
          .subscribe(data => {
            this.hourlyForecast = data;
          })
    })    
  }
}
