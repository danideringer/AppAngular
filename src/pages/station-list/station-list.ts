import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { StationModel } from './../../models/station.model';

/**
 * Generated class for the StationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-station-list',
  templateUrl: 'station-list.html',
})
export class StationListPage {

  frameData: any;
  cityCode: any;
  searchQuery: string = '';
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProv: ApiProvider) {}

  ionViewDidLoad() {
    this.apiProv.device$
      .subscribe((data: StationModel) => {
        this.frameData = data;
        this.initializeItems();
      })
    this.apiProv.getAll().subscribe();
  }

  getDetailStation(station){
    this.navCtrl.push("DetailStationPage", {station: station})
  }

  initializeItems(){
   this.items = this.frameData
  }

  getItems(ev: any) {
    this.initializeItems()
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
