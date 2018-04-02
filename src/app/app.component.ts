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

  rootPage = 'StationListPage';

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  for(let value of menu) {
    this.pages.push(
      { title: value.name, component: 'StationDetailsPage', params: value.id });
  }
  initializeBurguerMenu(){
    {title: "Home", component: 'StationListPage',  }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
