import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { CustomTimePage } from './../custom-time/custom-time';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiProvider } from './../../providers/api/api';
import * as moment from 'moment';

import { StationModel } from './../../models/station.model';

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
    {name: "Custom range", value: 3}
  ];
  loader: any;
  contactModal: any;
  graphData:any;
  tableData: any;
  forecastData: any;
  googleData: any;
  segment: string = 'GRAPH';
  dateString: any;
  from: any;
  to: any;
  variables: any;

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
        if(!this.variables) {
          this.variables = this.station.data;
        }
        this.initComp();
        this.showData(this.station);
        this.loader.dismiss();
      });
  }

  initComp() {
    if (!this.form) this.createForm();
  }

  createForm() {
    if (this.station.latitude) {
      this.form = this.fb.group({
        variable: [this.station.data[0], Validators.required],
        timeRange: [this.timeRange[0], Validators.required]           
      })
    } else if(this.station.latitude === null){
      this.form = this.fb.group({
        variable: [this.station.data[3], Validators.required],
        timeRange: [this.timeRange[3], Validators.required]           
      })
    }
    

    this.form.get("variable").valueChanges
      .subscribe(data => {
        this.showData(this.station);
      })

    this.form.get("timeRange").valueChanges
      .subscribe(data => {
        if ( data.name === "Custom range"){
          this.getCustomDate();
        }
        else {
          this.checkData();
          this.from = moment().subtract(data.value, 'day').unix();
          this.to = moment().unix();
          this.dateString = moment.unix(data.value).format("MM/DD/YYYY");
        }
      })
  }

  checkData(){
    if (this.station.data === null){
      this.showAlert();
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
    
    this.forecastData = {
      latitude: this.station.latitude,
      longitude: this.station.longitude
    }
   
    this.googleData = this.station.getGeoLocation();
  }

  getCustomDate() {
    let myModal = this.modalCtrl.create(CustomTimePage);
    
    myModal.present();
    myModal.onDidDismiss(data => {
      if (data === undefined){
        this.form.get('timeRange').value
      } else{
        this.loadData(data.from, data.to)
      } 
    });
  }

}