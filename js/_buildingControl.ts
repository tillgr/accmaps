import {OverpassData} from "./_overpassData";
import {Map as M} from "./_map";
import {LevelControl} from "./_levelControl";
import {LatLng, LatLngBounds} from "leaflet";

const toBBox = require('geojson-bounding-box');


let currentBuilding: string = 'APB';
let buildingBBoxesByBuildingName: Map<string, LatLngBounds> = new Map<string, LatLngBounds>();

export class BuildingControl {

    static getCurrentBuildingBoundingBox() {
        if (buildingBBoxesByBuildingName.get(currentBuilding) !== undefined) {
            return buildingBBoxesByBuildingName.get(currentBuilding);
        }

        const buildings = OverpassData.getBuildingData();
        let foundBuilding = null;

        // some instead of forEach here, because it stops execution after first hit
        buildings.features.some((building) => {
            if ((building.properties.name !== undefined && building.properties.name === currentBuilding) ||
                (building.properties.loc_ref !== undefined && building.properties.loc_ref === currentBuilding)) {
                foundBuilding = building;
                return true;
            }
            return false;
        });

        if (foundBuilding !== null) {
            const BBox = toBBox(foundBuilding);
            const BBox_Leaflet = new LatLngBounds(new LatLng(BBox[2], BBox[3]), new LatLng(BBox[0], BBox[1]));
            buildingBBoxesByBuildingName.set(currentBuilding, BBox_Leaflet);

            return BBox_Leaflet;
        }

        return null;
    }

    static searchForBuilding() {
        const buildingSearchBox = (<HTMLInputElement>document.getElementById('buildingSearch'));
        currentBuilding = buildingSearchBox.value;

        BuildingControl.getCurrentBuildingBoundingBox(); //todo: shouldn't be here, but is needed for search
        BuildingControl.centerMapToBuilding();

        LevelControl.removeInstance();
        LevelControl.getInstance();
    }

    static centerMapToBuilding() {
        //strange behaviour: getCenter returns values in wrong order - leaflet bug?
        const center = buildingBBoxesByBuildingName.get(currentBuilding).getCenter();
        M.getMap().panTo(new LatLng(center.lng, center.lat));
    }
}
