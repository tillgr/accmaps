import {GeoJSON, LatLng, LatLngBounds} from "leaflet";

import {OverpassData} from "../overpassData";
import {LevelControl} from "../levelControl";
import {DescriptionPopup} from "../ui/_descriptionPopup";

import {filterGeoJsonDataByBuildingBBox} from "./_filterGeoJsonDataByBuildingBBox";
import {getBuildingDescription} from "./_getBuildingDescription";

const toBBox = require('geojson-bounding-box');

const buildingBBoxesByBuildingName: Map<string, LatLngBounds> = new Map<string, LatLngBounds>();
const buildingFeaturesByBuildingName: Map<string, GeoJSON.Feature> = new Map<string, GeoJSON.Feature>();

let currentBuildingName = '';

export const BuildingControl = {
    getCurrentBuildingGeoJSON(): GeoJSON.FeatureCollection<any> {
        return filterGeoJsonDataByBuildingBBox(OverpassData.getIndoorData(), BuildingControl.getCurrentBuildingBoundingBox());
    },

    getCurrentBuildingBoundingBox(): LatLngBounds {
        if (buildingBBoxesByBuildingName.get(currentBuildingName) !== undefined) {
            return buildingBBoxesByBuildingName.get(currentBuildingName);
        }

        const buildings = <GeoJSON.FeatureCollection<any>>OverpassData.getBuildingData();

        // some instead of forEach here, because it stops execution after first hit
        buildings.features.some((building: GeoJSON.Feature<any>) => {
            if ((building.properties.name !== undefined && building.properties.name === currentBuildingName) ||
                (building.properties.loc_ref !== undefined && building.properties.loc_ref === currentBuildingName)) {
                buildingFeaturesByBuildingName.set(currentBuildingName, building);
                return true;
            }
            return false;
        });

        if (buildingFeaturesByBuildingName.get(currentBuildingName) !== undefined) {
            const BBox = toBBox(buildingFeaturesByBuildingName.get(currentBuildingName));
            const BBox_Leaflet = new LatLngBounds(new LatLng(BBox[2], BBox[3]), new LatLng(BBox[0], BBox[1]));
            buildingBBoxesByBuildingName.set(currentBuildingName, BBox_Leaflet);

            return BBox_Leaflet;
        }

        return null;
    },

    getCurrentBuildingDescription(): string {
        const currentBuildingFeature = buildingFeaturesByBuildingName.get(currentBuildingName);
        return getBuildingDescription(currentBuildingFeature);
    },

    searchForBuilding(searchTerm: string): Promise<string> {
        currentBuildingName = searchTerm;

        return new Promise<string>((resolve, reject) => {
            if (BuildingControl.getCurrentBuildingBoundingBox() === null) {
                reject('Building "' + searchTerm + '" could not be found');
                return;
            }
            LevelControl.reCreate();
            DescriptionPopup.update(BuildingControl.getCurrentBuildingDescription());
            resolve('');
        });
    }
}

