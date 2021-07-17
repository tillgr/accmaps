import {OverpassData} from "./_overpassData";
import {IndoorLayer} from "./_indoorLayer";
import {Map} from "./_map";
import {LatLng} from "leaflet/dist/leaflet-src.esm";

const toBBox = require('geojson-bounding-box');

let currentBuilding = 'APB';
let buildingBBoxesByBuildingName = [];

export class BuildingControl {

    static getCurrentBuildingBoundingBox() {
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
            buildingBBoxesByBuildingName[currentBuilding] = new L.LatLngBounds(new LatLng(BBox[2], BBox[3]), new LatLng(BBox[0], BBox[1]),);

            return buildingBBoxesByBuildingName[currentBuilding];
        }

        return null;
    }

    static searchForBuilding() {
        const buildingSearchBox = document.getElementById('buildingSearch');
        currentBuilding = buildingSearchBox.value;

        IndoorLayer.getInstance().createIndoorLayerFromCurrentIndoorData();
        BuildingControl.centerMapToBuilding();
    }

    static centerMapToBuilding() {
        //strange behaviour: getCenter returns values in wrong sequence - leaflet bug?
        const center = buildingBBoxesByBuildingName[currentBuilding].getCenter();
        Map.getMap().panTo(new LatLng(center.lng, center.lat));
    }
}
