import {BuildingControl} from "./_buildingControl";
import {GeoJSON, LatLng, LatLngBounds} from "leaflet";
import {Position} from "geojson";

let currentBuildingBBox: LatLngBounds;

function filterGeoJsonData(geoJSON: GeoJSON.FeatureCollection<any>) {
    currentBuildingBBox = BuildingControl.getCurrentBuildingBoundingBox();
    const features = geoJSON.features.filter(filterFeatures);

    return {type: 'FeatureCollection', features: features};
}

function filterFeatures(feature: GeoJSON.Feature<any>) {
    //todo: check if Lines/points should really be filtered!!!!
    if (feature.properties === undefined || feature.properties.level === undefined || feature.geometry.type === 'Line' || feature.geometry.type === 'Point') {
        return false;
    }

    // no current building found, skip filtering
    if (currentBuildingBBox === null) {
        return true;
    }

    let inside = false;

    if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates.forEach((c: Position[][][] | Position[][] | Position[]) => {
            c.some((p: any[]) => {
                const latLng = new LatLng(p[0], p[1]);
                if (currentBuildingBBox.contains(latLng)) {
                    return inside = true;
                }
                return false;
            });
        });
    } else if (feature.geometry.type === 'MultiPolygon') {
        // todo
    }

    return inside;
}

export {filterGeoJsonData}
