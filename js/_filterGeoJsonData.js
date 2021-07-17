import {BuildingControl} from "./_buildingControl";

const pointInPolygon = require("robust-point-in-polygon")

let currentBuildingPolygon;

function filterGeoJsonData(geoJSON) {
    currentBuildingPolygon = BuildingControl.getCurrentBuildingPolygon();
    const features = geoJSON.features.filter(filterFeatures);

    return {type: 'FeatureCollection', features: features};
}

function filterFeatures(feature) {
    if (feature.properties === undefined || feature.properties.level === undefined) {
        return false;
    }

    // no current building found, skip filtering
    if (currentBuildingPolygon === null) {
        return true;
    }

    let inside = false;

    feature.geometry.coordinates.forEach((f) => {
        if (inside || !Array.isArray(f)) {
            return;
        }

        f.some((point) => {
            if (pointInPolygon(currentBuildingPolygon, point) !== 1) {
                return inside = true;
            }
            return false;
        });
    });

    return inside;
}

export {filterGeoJsonData}
