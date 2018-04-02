import { Component, Input } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';


declare var google;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})

export class GoogleMapComponent {

  map: any;

  @Input()
  data: any;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation
  ) {}

  ngAfterViewInit(){
    this.loadMap();
  }

  loadMap(){
    let latitude = +this.data.variables['latitude']; //position.coords.latitude;
    let longitude = +this.data.variables['longitude']; //position.coords.longitude;
    console.log(latitude, longitude); 
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }
}


