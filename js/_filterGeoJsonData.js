import {getMap} from "./_map";

const toBBox = require('geojson-bounding-box');
let bounds;

function filterGeoJsonData(geoJSON) {
    const map = getMap();

    bounds = map.getBounds();
    geoJSON.features = geoJSON.features.filter(filterFeatures);
    return geoJSON;
}

function filterFeatures(feature) {
    let featureBounds = toBBox(feature)
    return !(feature.properties === undefined || feature.properties.level === undefined) &&
        (bounds._northEast.lat >= featureBounds[1] && bounds._northEast.lng >= featureBounds[0] && bounds._southWest.lat <= featureBounds[3] && bounds._southWest.lng <= featureBounds[2]);
}

export {filterGeoJsonData}
