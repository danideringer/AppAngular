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
  tableData: any;
  segment: string = 'GRAPH';
  dateString: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private api: ApiProvider, private loadingCtrl: LoadingController) {
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create();
    this.loader.present();
  }

  ionViewDidLoad() {
    this.stationId = 1; //this.navParams.get("station").id;
    this.loadData();
  }


  loadData(from: number = 0, to: number = 0){
    this.presentLoading();
    this.api.getDevice(this.stationId, from, to)
      .subscribe((data) => {
        this.station = data;
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
      .subscribe(data => {
        this.showData(this.station);
      })  

    this.form.get("timeRange").valueChanges
      .subscribe(data => {
        let from = moment().subtract(data.value, 'day').unix();
        let to = moment().unix();
        this.dateString = moment.unix(data.value).format("MM/DD/YYYY");
        this.loadData(from, to);
        this.showData(this.station);
      })
  }

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
      console.log(this.graphData.variables)
    }
  }
}
