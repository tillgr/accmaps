import {OverpassData} from "./_overpassData";

let currentBuilding = 'APB';

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
            return foundBuilding.geometry.coordinates[0];
        }

        return null;

    }
}
