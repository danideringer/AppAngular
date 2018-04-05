import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from './../providers/api/api';
import { StationListPage } from '../pages/station-list/station-list';
import { DetailStationPage } from './../pages/detail-station/detail-station'

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  allDevice: any;
  pages: Array<{title: string, component: any, params: any}>;

  rootPage = 'StationListPage';
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private api: ApiProvider) {
    this.initializeApp();
  }

  ngOnViewLoad(){
    this.api.device$.subscribe((data) => {
      this.fillArray();
      this.allDevice = data;
      for (let entry of this.allDevice){
        this.pages.push({
          title: entry.name,
          component: 'DetailStationPage',
          params: entry
        })
      }  
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  fillArray(){
    this.pages = [
      { title: 'Home', component: 'StationListPage', params: '' }
    ];
  }

  openPage(page) {
    this.nav.push(page.component, {data: page.params});
  }
}
