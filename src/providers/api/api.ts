import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { checkBindingNoChanges } from '@angular/core/src/view/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map'


import { StationModel } from './../../models/station.model';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {

  private devices = new BehaviorSubject<any>([]);

  constructor(public http: HttpClient) {}

  get device$(){
    return this.devices.asObservable();
  }

  getAll(){
    return this.http.get('http://localhost:3000/api/v1/devices_latest_data/')
      .do((data) => {
        console.log(data)
        this.devices.next(data);
      })
  }
  
  getCityAccuweather(latitude: number, longitude: number){
    return this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=YVDPLfCRcdXjeut17arxlxzPlErqOjCp&q=${latitude}%2C${longitude}`)
  }

  getForecastAccuweather(cityCode: number){
    return this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityCode}?apikey=YVDPLfCRcdXjeut17arxlxzPlErqOjCp`)

  }

  getDevice(id: number, from: number = 0, to: number = 0){
    let url = `http://localhost:3000/api/v1/device_data/${id}?`;

    if (from != 0 && to != 0) {
      url = `${url}from=${from}&to=${to}`;
    }

    return this.http.get(url);
      /*.map((data) => {
        return new StationModel(data);
      });*/
  }

  getTable(id: number){
    return this.http.get(`http://localhost:3000/api/v1/device_data/${id}?from=1520504773&&to=1520505914`);
  }
}
