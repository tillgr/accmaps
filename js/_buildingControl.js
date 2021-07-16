import {OverpassData} from "./_overpassData";

const toBBox = require('geojson-bounding-box');

let currentBuilding = 'APB';

export class BuildingControl {
    static getCurrentBuildingBoundingBox() {
        const buildings = OverpassData.getBuildingData();
        let foundBuilding = null;

        // some instead of forEach here, because it stops execution after first hit
        buildings.features.some((building) => {
            console.log(building.properties.name);
            if ((building.properties.name !== undefined && building.properties.name === currentBuilding) ||
                (building.properties.loc_ref !== undefined && building.properties.loc_ref === currentBuilding)) {
                foundBuilding = building;
                return true;
            }
            return false;
        });

        if (foundBuilding !== null) {
            return toBBox(foundBuilding)
        } else {
            return null;
        }

    }
}
