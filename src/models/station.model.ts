export class StationModel {

    name: string;
    data: any;
    latitude: string;
    longitude: string;
    googleData: any;

    constructor(station?: any) {
        this.name = station && station.name || null;
        this.data = station && station.data || null;
        this.latitude = station && station.latitude || null;
        this.longitude = station && station.longitude || null;
        console.log(this.latitude)
    }

    
    getGeoLocation() {
        if (this.latitude) {
            this.getGeoLocaTionFromWeatherStation();
            return this.googleData
        } else if(this.latitude === null){
            this.getGeoLocaTionFromVehicleStation();
            return this.googleData
        }
    }

    getGeoLocaTionFromWeatherStation(){
        const geoLocation = {
            latitude: this.latitude,
            longitude: this.longitude 
        };
        return this.googleApiShow(geoLocation)
    }

    getGeoLocaTionFromVehicleStation(){
        /*const variables = this.station['data'].filter((item) => {
            return selectedMap.includes(item.id);
          })*/
        /*if (this.data.id === 7){
            const latitude = this.data.values
            cons
        }*/
        
        
        
        const geoLocation = this.data.map((i) => {
            return {
                latitude: i.latitude[0],
                longitude: i.longitude[0]
            }
        })

        return this.googleApiShow(geoLocation)
    }

    googleApiShow(geoLocation){
        this.googleData = {
            variables: geoLocation
        }
        return this.googleData
    }

}