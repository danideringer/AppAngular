import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { CustomTimePage } from './../custom-time/custom-time';
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
  timeForm: FormGroup;
  timeRange = [
    {name: "Last week", value: 7},
    {name: "Last 15 days", value: 15},
    {name: "Last month", value: 30},
    {name: "Custom range", value: 7}
  ];
  loader: any;
  contactModal: any;
  graphData:any;
  tableData: any;
  googleData: any;
  segment: string = 'GRAPH';
  dateString: any;
  from: any;
  to: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public modalCtrl: ModalController, 
    private fb: FormBuilder, 
    private api: ApiProvider, 
    private loadingCtrl: LoadingController
  ){
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
      .subscribe((data: StationModel) => {     
        this.station = data;
        this.initComp();
        this.showData(this.station);
        this.loader.dismiss();
      });
  }

  openModal() {
    let myModal = this.modalCtrl.create(CustomTimePage);
    myModal.present();
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
      .subscribe((data: StationModel) => {
        this.showData(this.station);
      })

    this.form.get("timeRange").valueChanges
      .subscribe((data: StationModel) => {
        this.from = moment().subtract(data.data.value, 'day').unix();
        this.to = moment().unix();
        this.dateString = moment.unix(data.data.value).format("MM/DD/YYYY");
      })
  }

  showData(station: any){

    let selectedVar = this.form.get('variable').value;
    const gd = this.station.getSelectedVar(selectedVar)

    this.graphData = {
      variables: gd,
      rangeGraph: this.form.get("timeRange").value 
    }

    this.tableData = {
      variables: gd,
      rangeTable: this.form.get("timeRange").value 
    }
    
    this.googleData = this.station.getGeoLocation();
  }
}