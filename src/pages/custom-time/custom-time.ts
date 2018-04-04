import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

import * as moment from 'moment';

/**
 * Generated class for the CustomTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-custom-time',
  templateUrl: 'custom-time.html',
})
export class CustomTimePage {
  
  from: any;
  to: any;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  submitModal(){
    this.data = {
      from: moment(this.from).unix(),
      to: moment(this.to).unix(),
    }
    this.viewCtrl.dismiss(this.data);
  }
  
  closeModal(){
    this.viewCtrl.dismiss();
  }
  
}
