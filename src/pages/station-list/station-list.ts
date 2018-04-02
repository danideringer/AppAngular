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
  searchQuery: string = '';
  items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProv: ApiProvider) {}

  ionViewDidLoad() {
    this.apiProv.device$
      .subscribe((data: StationModel) => {
        this.frameData = data;
      })
    this.apiProv.getAll().subscribe();
  }

  getDetailStation(station){
    console.log(station.name)
    this.navCtrl.push("DetailStationPage", {station: station})
  }


  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.frameData = this.frameData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
