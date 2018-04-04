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
        let latitudeVar = this.data[0].values[0]
        let longitudeVar = this.data[1].values[0]
        
        const geoLocation = {
            latitude: latitudeVar.value,
            longitude: longitudeVar.value
        }
        console.log(geoLocation)
       return this.googleApiShow(geoLocation)
    }

    googleApiShow(geoLocation){
        this.googleData = {
            variables: geoLocation
        }
        return this.googleData
    }

    getSelectedVar(selectedVar: any){
        if (!Array.isArray(selectedVar)) {
            selectedVar = [selectedVar];
          }
        
        const selectedMap = selectedVar.map((item) => item.id);
        const variables = this.data.filter((item) => {
            return selectedMap.includes(item.id);
        })

        if (variables){
            const gd = variables.map((v) => {
                return {
                  name: v.name,
                  values: v.values,
                  symbol: v.symbol
                }
            });
            return gd
        }
    }

    getGd(variables){
        const gd = variables.map((v) => {
            return {
              name: v.name,
              values: v.values,
              symbol: v.symbol
            }
        });
        return gd 
    }
}