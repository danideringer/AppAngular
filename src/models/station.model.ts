export class StationModel {

    name: string;
    stationData: any;
    latitude: string;

    constructor(data?: any) {
        this.name = data && data.name || null;
        this.stationData = data && data.data || null;
        this.latitude = data && data.latitude || null;
    }

    getLatitude() {
        // Hago lo que necesite
        if (this.latitude) {
            return this.latitude;
        } else {
            return null
        }
    }

    mifun() {
        return 'loque quiereas';
    }

}