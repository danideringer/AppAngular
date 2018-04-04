import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private fb: FormBuilder) {
   this.createForm();
  }
  
  createForm() {
    this.form = this.fb.group({
      variable: ["2", Validators.required],
      timeRange: ["2", Validators.required]           
    })
  }
  
  closeModal(){
    this.viewCtrl.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomTimePage');
  }

}
