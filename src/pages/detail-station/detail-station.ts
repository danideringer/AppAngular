import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiProvider } from './../../providers/api/api';
import * as moment from 'moment';

import { StationModel } from './../../models/station.model';

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
  tableData: any;
  googleData: any;
  segment: string = 'GRAPH';
  dateString: any;
  from: any;
  to: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fb: FormBuilder, private api: ApiProvider, private loadingCtrl: LoadingController) {
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create();
    this.loader.present();
  }

  ionViewDidLoad() {
    this.stationId = 3; //this.navParams.get("station").id;
    this.loadData();
  }

  loadData(from: number = 0, to: number = 0){
    this.presentLoading();
    this.api.getDevice(this.stationId, from, to)
      .subscribe((data: StationModel) => {     
        this.station = data; // TODA LA ESTACIÓN 
        this.initComp();
        this.showData(this.station);
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
      .subscribe((data) => {
        this.showData(this.station);
      })  

    this.form.get("timeRange").valueChanges
      .subscribe(data => {
        this.from = moment().subtract(data.value, 'day').unix();
        this.to = moment().unix();
        this.dateString = moment.unix(data.value).format("MM/DD/YYYY");
      //  this.checkData();
      })
  }

  /*checkData(){
    if (this.station.data['value'] === ""){
      this.checkData();
    }
    else{
      this.loadData(this.from, this.to);
      this.showData(this.station)
    }
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }*/

  showData(station: any){
    let selectedVar = this.form.get('variable').value;

    if (!Array.isArray(selectedVar)) {
      selectedVar = [selectedVar];
    }

    const selectedMap = selectedVar.map((item) => item.id);
    const variables = this.station['data'].filter((item) => {
      return selectedMap.includes(item.id);
    })

    if (variables) {
      
      const gd = variables.map((v) => {
        return {
          name: v.name,
          values: v.values,
          symbol: v.symbol
        }
      });

      this.graphData = {
        variables: gd,
        rangeGraph: this.form.get("timeRange").value 
      }

      this.tableData = {
        variables: gd,
        rangeTable: this.form.get("timeRange").value 
      }
    }
    this.googleData = this.station.getGeoLocation();
    console.log("11111111111", this.station.getGeoLocation());
  }
}