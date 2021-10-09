import {GeoJSON, LatLng, LatLngBounds} from "leaflet";

const toBBox = require('geojson-bounding-box');

import {OverpassData} from "../overpassData";
import {BuildingInterface} from "../interfaces/buildingInterface";
import {MAPQUEST_API_KEY, NOMINATIM_SERVER} from "../data/constants";

/**
 * Finding a building by search string:
 * 1) Iterate through all building Features if there is a Feature with the given name. If so, return the building Feature.
 * 2) Otherwise, call Nominatim service to do a more advanced search. Since Nominatim does not return a GeoJSON Feature,
 *    we have to again iterate through all building Features to find the id returned by Nominatim.
 */
export function buildingSearch(searchString: string): Promise<BuildingInterface> {
    let returnBuilding: BuildingInterface;

    const buildings = OverpassData.getBuildingData();
    const found = buildings.features.some((building: GeoJSON.Feature<any, any>) => {
        if ((building.properties.name !== undefined && building.properties.name === searchString) ||
            (building.properties.loc_ref !== undefined && building.properties.loc_ref === searchString)) {
            const BBox = toBBox(building);
            returnBuilding = {
                boundingBox: new LatLngBounds(new LatLng(BBox[2], BBox[3]), new LatLng(BBox[0], BBox[1])),
                feature: building
            }
            return true;
        }
        return false;
    });

    if (found) {
        return new Promise(resolve => {
            resolve(returnBuilding);
        });
    }

    return nominatimSearch(searchString);
}


function nominatimSearch(searchString: string): Promise<BuildingInterface> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const nominatimResponse = JSON.parse(xhr.responseText);
                    if (nominatimResponse.length === 0 || nominatimResponse[0] === undefined) {
                        return reject('Building could not be found');
                    }

                    const BBox = nominatimResponse[0]['boundingbox'];
                    const buildingFeature = findBuildingFeatureInDataset(nominatimResponse[0]['osm_type'] + '/' + nominatimResponse[0]['osm_id']);

                    if (buildingFeature === null) {
                        return reject('Building was found, but is not in the dataset of SIT-conform buildings');
                    }

                    if (BBox !== undefined) {
                        const returnBuilding = {
                            boundingBox: new LatLngBounds(new LatLng(BBox[2], BBox[3]), new LatLng(BBox[0], BBox[1])),
                            feature: buildingFeature
                        };
                        return resolve(returnBuilding);
                    }

                    return reject(null);
                } else if (xhr.status > 400) {
                    return reject(null);
                }
            }
        };

        xhr.open('GET',
            NOMINATIM_SERVER + '?key= ' + MAPQUEST_API_KEY + '&format=json&q=' + encodeURIComponent(searchString) + '&addressdetails=0&limit=1',
            true);
        xhr.send();
    });
}

function findBuildingFeatureInDataset(featureId: string): GeoJSON.Feature<any, any> {
    const buildings = OverpassData.getBuildingData();
    let foundBuilding: GeoJSON.Feature<any, any> = null;

    buildings.features.some((b) => {
        if (b.id === featureId) {
            foundBuilding = b;
            return true;
        }
        return false;
    });

    return foundBuilding;
}
