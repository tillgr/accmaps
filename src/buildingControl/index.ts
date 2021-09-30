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

        console.error('Building not found');
        return null;
    },

    getCurrentBuildingCenter(): LatLng {
        const boundingBox = buildingsBySearchString.get(currentSearchString).boundingBox;
        return boundingBox.getCenter();
    },

    getBuildingDescription(): string {
        const currentBuildingFeature = buildingsBySearchString.get(currentSearchString).feature;
        return getBuildingDescription(currentBuildingFeature);
    },

    searchAndShowBuilding(searchString: string): Promise<string> {
        return buildingSearch(searchString).then((b: BuildingInterface) => {
            buildingsBySearchString.set(searchString, b);
            currentSearchString = searchString;

            LevelControl.reCreate();
            DescriptionPopup.update(BuildingControl.getBuildingDescription());

            return new Promise((resolve => resolve('Building found.')));
        });
    }
}

