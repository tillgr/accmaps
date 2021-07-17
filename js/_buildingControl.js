import {OverpassData} from "./_overpassData";
import {IndoorLayer} from "./_indoorLayer";
import {Map} from "./_map";

const toBBox = require('geojson-bounding-box');

let currentBuilding = 'APB';
let buildingPolygonsByBuildingName = [];
let buildingFeaturesByBuildingName = [];

export class BuildingControl {
    static getCurrentBuildingPolygon() {
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
            buildingPolygonsByBuildingName[currentBuilding] = foundBuilding.geometry.coordinates[0];
            buildingFeaturesByBuildingName[currentBuilding] = foundBuilding;
            return buildingPolygonsByBuildingName[currentBuilding];
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
        //create a surrounding rectangle (aka bounding box) and calculate the center point afterwards
        const currentBuildingBBox = toBBox(buildingFeaturesByBuildingName[currentBuilding]);
        const center = new L.LatLng((((currentBuildingBBox[3] - currentBuildingBBox[1]) / 2) + currentBuildingBBox[1]), (((currentBuildingBBox[2] - currentBuildingBBox[0]) / 2) + currentBuildingBBox[0]));
        Map.getMap().panTo(center);
    }
}
