import {GeoJSON, LatLng, LatLngBounds} from "leaflet";

import {OverpassData} from "../overpassData";
import {LevelControl} from "../levelControl";
import {filterGeoJsonDataByBuildingBBox} from "./_filterGeoJsonDataByBuildingBBox";
import {DescriptionPopup} from "../ui/_descriptionPopup";

const toBBox = require('geojson-bounding-box');

const buildingBBoxesByBuildingName: Map<string, LatLngBounds> = new Map<string, LatLngBounds>();
const buildingFeaturesByBuildingName: Map<string, GeoJSON.Feature> = new Map<string, GeoJSON.Feature>();
let currentBuilding = '';

export const BuildingControl = {
    getCurrentBuildingGeoJSON(): GeoJSON.FeatureCollection<any> {
        return filterGeoJsonDataByBuildingBBox(OverpassData.getIndoorData(), BuildingControl.getCurrentBuildingBoundingBox());
    },

    getCurrentBuildingBoundingBox(): LatLngBounds {
        if (buildingBBoxesByBuildingName.get(currentBuilding) !== undefined) {
            return buildingBBoxesByBuildingName.get(currentBuilding);
        }

        const buildings = <GeoJSON.FeatureCollection<any>>OverpassData.getBuildingData();

        // some instead of forEach here, because it stops execution after first hit
        buildings.features.some((building: GeoJSON.Feature<any>) => {
            if ((building.properties.name !== undefined && building.properties.name === currentBuilding) ||
                (building.properties.loc_ref !== undefined && building.properties.loc_ref === currentBuilding)) {
                buildingFeaturesByBuildingName.set(currentBuilding, building);
                return true;
            }
            return false;
        });

        if (buildingFeaturesByBuildingName.get(currentBuilding) !== undefined) {
            const BBox = toBBox(buildingFeaturesByBuildingName.get(currentBuilding));
            const BBox_Leaflet = new LatLngBounds(new LatLng(BBox[2], BBox[3]), new LatLng(BBox[0], BBox[1]));
            buildingBBoxesByBuildingName.set(currentBuilding, BBox_Leaflet);

            return BBox_Leaflet;
        }

        return null;
    },

    //todo: refactor
    getCurrentBuildingDescription(): string {
        const currentBuildingFeature = buildingFeaturesByBuildingName.get(currentBuilding);
        console.log(currentBuildingFeature.properties);
        let description = ""

        if (currentBuildingFeature.properties.name !== undefined) {
            description += "Current building: " + currentBuildingFeature.properties.name;
            if (currentBuildingFeature.properties.loc_ref !== undefined) {
                description += " (" + currentBuildingFeature.properties.loc_ref + ")";

            }
        }

        if (currentBuildingFeature.properties.wheelchair !== undefined) {
            description += (currentBuildingFeature.properties.wheelchair == "yes") ? ", accessible by wheelchair" : ", not accessible by wheelchair";
        }

        if (currentBuildingFeature.properties.opening_hours !== undefined) {
            description += ", opening hours: " + currentBuildingFeature.properties.opening_hours;
        }

        return description;
    },

    searchForBuilding(searchTerm: string): Promise<string> {
        currentBuilding = searchTerm;

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

