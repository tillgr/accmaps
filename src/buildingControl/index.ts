import {GeoJSON, LatLng} from "leaflet";

import {OverpassData} from "../overpassData";
import {LevelControl} from "../levelControl";
import {DescriptionPopup} from "../ui/_descriptionPopup";

import {filterGeoJsonDataByBuildingBBox} from "./_filterGeoJsonDataByBuildingBBox";
import {getBuildingDescription} from "./_getBuildingDescription";
import {buildingSearch} from "./_buildingSearch";
import {BuildingInterface} from "../interfaces/buildingInterface";


const buildingsBySearchString: Map<string, BuildingInterface> = new Map<string, BuildingInterface>();
let currentSearchString = '';

export const BuildingControl = {
    getBuildingGeoJSON(): GeoJSON.FeatureCollection<any> {
        const buildingInterface = buildingsBySearchString.get(currentSearchString);
        if (buildingInterface !== undefined) {
            return filterGeoJsonDataByBuildingBBox(OverpassData.getIndoorData(), buildingInterface.boundingBox);
        }
    },

    getCurrentBuildingCenter(): LatLng {
        const boundingBox = buildingsBySearchString.get(currentSearchString).boundingBox;
        return boundingBox.getCenter();
    },

    getBuildingDescription(): string {
        return getBuildingDescription(buildingsBySearchString.get(currentSearchString).feature);
    },

    searchAndShowBuilding(searchString: string): Promise<string> {
        return buildingSearch(searchString).then((bi: BuildingInterface) => {
            buildingsBySearchString.set(searchString, bi);
            currentSearchString = searchString;

            LevelControl.reCreate();
            DescriptionPopup.update(BuildingControl.getBuildingDescription());

            return new Promise((resolve => resolve('building found.')));
        });
    }
}

