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
  form: FormGroup;
  timeRange = [
    {name: "Last week", value: 7},
    {name: "Last 15 days", value: 15},
    {name: "Last month", value: 30}
  ];

  loader: any;
  graphData:any;
  segment: string = 'GRAPH';

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
    this.api.getDevice(this.stationId, from, to)
      .subscribe((data) => {
        this.station = data;
        this.initComp();
        this.showGraph(this.station);
        this.loader.dismiss();
      });
  }

  initComp() {
    if (!this.form) this.createForm();
  }


  createForm() {
    this.form = this.fb.group({
      variable: [this.station.data[0], Validators.required],
      timeRange: [this.timeRange[0], Validators.required]           
    })

    this.form.get("variable").valueChanges
      .subscribe(data => {
        this.showGraph(this.station);
      })  

    this.form.get("timeRange").valueChanges
      .subscribe(data => {
        let from = moment().subtract(data.value, 'day').unix();
        let to = moment().unix();
        this.loadData(from, to);
        this.showGraph(this.station);
      })
  }

  showGraph(station: any){
    const selectedVar = this.form.get('variable').value;

    const variable = this.station['data'].find((item) => {
      return item.id === selectedVar.id
    })
    
    if (variable) {
      this.graphData = {
        names: variable.name,
        values: variable.values
      }
    }
  }
}
