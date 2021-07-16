import {BuildingControl} from "./_buildingControl";

const toBBox = require('geojson-bounding-box');

let currentBuildingBounds;

function filterGeoJsonData(geoJSON) {
    currentBuildingBounds = BuildingControl.getCurrentBuildingBoundingBox();

    console.log(currentBuildingBounds);
    geoJSON.features = geoJSON.features.filter(filterFeatures);
    return geoJSON;
}

function filterFeatures(feature) {
    let featureBounds = toBBox(feature);
    let returnBool = !(feature.properties === undefined || feature.properties.level === undefined);

    // check if building was found, otherwise do not filter for bounding box
    if (currentBuildingBounds !== null) {
        returnBool = returnBool && (currentBuildingBounds[1] >= featureBounds[1] &&
            currentBuildingBounds[0] >= featureBounds[0] &&
            currentBuildingBounds[3] <= featureBounds[3] &&
            currentBuildingBounds[2] <= featureBounds[2]);
    }

    return returnBool;
}

export {filterGeoJsonData}
