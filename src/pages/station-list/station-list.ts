import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProv: ApiProvider) {
  }

  ionViewDidLoad() {
    this.apiProv.device$
      .subscribe((data) => {
        this.frameData = data;
      })
    this.apiProv.getAll().subscribe();
  }



  getDetailStation(frameData){
    this.navCtrl.push("DetailStationPage", {station: frameData})
  }
}
