import {BuildingControl} from "./_buildingControl";
import {GeoJSON, LatLng, LatLngBounds} from "leaflet";
import {GeoJsonObject, Position} from "geojson";

let currentBuildingBBox: LatLngBounds;

export function filterGeoJsonData(geoJSON: GeoJsonObject): GeoJSON.FeatureCollection<any> {
    const featureCollection = <GeoJSON.FeatureCollection<any>>geoJSON;
    currentBuildingBBox = BuildingControl.getCurrentBuildingBoundingBox();
    const featureCollectionFilteredFeatures = featureCollection.features.filter(filterFeatures);

    //create a new object to avoid to original GeoJSON object to be modified
    return {type: "FeatureCollection", features: featureCollectionFilteredFeatures} as GeoJSON.FeatureCollection<any>;
}

function filterFeatures(feature: GeoJSON.Feature<any>) {
    if (feature.properties === undefined || feature.properties.level === undefined) {
        return false;
    }

    // no current building found, skip filtering
    if (currentBuildingBBox === null) {
        return true;
    }

    return isFeatureInsideCurrentBuilding(feature.geometry.coordinates);
}

function isFeatureInsideCurrentBuilding(featureCoordinates: Position[][] | Position[] | Position): boolean {
    switch (getArrayDepth(featureCoordinates)) {
        case 1:
            featureCoordinates = <Position>featureCoordinates;
            const latLng = new LatLng(featureCoordinates[0], featureCoordinates[1]);
            return currentBuildingBBox.contains(latLng);
        case 2:
            featureCoordinates = <Position[]>featureCoordinates;
            return featureCoordinates.some((fc: Position) => {
                const latLng = new LatLng(fc[0], fc[1]);
                return currentBuildingBBox.contains(latLng);
            });
        case 3:
            featureCoordinates = <Position[][]>featureCoordinates;
            return featureCoordinates.some((fc: Position[]) => {
                return fc.some((fc2: Position) => {
                    const latLng = new LatLng(fc2[0], fc2[1]);
                    return currentBuildingBBox.contains(latLng);
                });
            });
    }
}


function getArrayDepth(value: any[]): number {
    return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0;
}
