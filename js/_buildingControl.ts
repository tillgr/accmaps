import {GeoJSON, LatLng, LatLngBounds} from "leaflet";

const toBBox = require('geojson-bounding-box');

import {OverpassData} from "./_overpassData";
import {Map as M} from "./_map";
import {LevelControl} from "./_levelControl";

let currentBuilding: string = 'APB';
let buildingBBoxesByBuildingName: Map<string, LatLngBounds> = new Map<string, LatLngBounds>();

export const BuildingControl = {
    getCurrentBuildingBoundingBox(): LatLngBounds {
        if (buildingBBoxesByBuildingName.get(currentBuilding) !== undefined) {
            return buildingBBoxesByBuildingName.get(currentBuilding);
        }

        const buildings = <GeoJSON.FeatureCollection<any>>OverpassData.getBuildingData();

        let foundBuilding = null;
        // some instead of forEach here, because it stops execution after first hit
        buildings.features.some((building: GeoJSON.Feature<any>) => {
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
    },

    searchForBuilding() {
        const buildingSearchBox = (<HTMLInputElement>document.getElementById('buildingSearch'));
        currentBuilding = buildingSearchBox.value;

        centerMapToBuilding();

        LevelControl.remove();
        LevelControl.create();
    }
}

function centerMapToBuilding() {
    const currentBuildingBBox = BuildingControl.getCurrentBuildingBoundingBox();

    if (currentBuildingBBox !== null) {
        const center = currentBuildingBBox.getCenter();
        //strange behaviour: getCenter returns values in wrong order - leaflet bug?
        M.getMap().panTo(new LatLng(center.lng, center.lat));
    }
}
