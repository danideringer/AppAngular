import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from './../providers/api/api'
import { StationListPage } from '../pages/station-list/station-list';
import { DetailStationPage } from './../pages/detail-station/detail-station'

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  allDevice: any;
  pages: Array<{title: string, component: any, params: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private apiProv: ApiProvider) {
    this.initializeApp();
    this.burguerMenu();
    this.apiProv.getAll()
      .subscribe((data) => {
        this.allDevice = data;
        this.allDevice.map((item) => {
          return this.allDevice.push({
            title: item.name,
            component: 'DetailStationPage',
            params: item
          })
        })
      })
  }

  burguerMenu(){
    this.pages = [
      { title: 'Home', component: 'DetailStationPage' , params:' '}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component, {data: page.params});
  }
}
