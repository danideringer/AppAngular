import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiProvider } from './../../providers/api/api';
import * as moment from 'moment';

/**
 * Generated class for the DetailStationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-station',
  templateUrl: 'detail-station.html',
})
export class DetailStationPage {

  station: any;
  stationId: any;
  stationData: any;
  form: FormGroup;
  timeRange = [
    {name: "Last week", value: 7},
    {name: "Last 15 days", value: 15},
    {name: "Last month", value: 30}
  ];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private api: ApiProvider, private loadingCtrl: LoadingController) {
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create();

    this.loader.present();
  }

  ionViewDidLoad() {
    this.stationId = this.navParams.get("station").id;
    this.loadData();
  }

  loadData(from: number = 0, to: number = 0){
    this.presentLoading();
    this.api.getDevice(this.stationId, from, to)//1520504773)
      .subscribe((data) => {
        this.station = data;
        this.initComp();
        this.loader.dismiss();
        this.showGraph(this.station, from, to);
      });
  }

  initComp() {
    if (!this.form) this.createForm();
  }


  createForm() {
    console.log('create form');
    this.form = this.fb.group({
      variable: [this.station.data[0], Validators.required],
      timeRange: [this.timeRange[0], Validators.required]           
    })
    
    this.form.get("variable").valueChanges
      .subscribe(data => {
        //this.loadData();
        console.log(data);
      })

    this.form.get("timeRange").valueChanges
      .subscribe(data => {
        let from = moment().subtract(data.value, 'day').unix();
        let to = moment().unix();
        this.loadData(from, to);
        console.log(data);
      })
  }

  showGraph(station: any, from: number, to:number ){
    this.station.data
    this.station.name
    this.station.data.values
  }
}
