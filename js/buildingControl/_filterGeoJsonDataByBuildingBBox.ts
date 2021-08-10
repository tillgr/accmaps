import {GeoJSON, LatLng, LatLngBounds} from "leaflet";
import {GeoJsonObject, Position} from "geojson";

export function filterGeoJsonDataByBuildingBBox(geoJSON: GeoJsonObject, buildingBBox: LatLngBounds): GeoJSON.FeatureCollection<any> {
    const featureCollection = <GeoJSON.FeatureCollection<any>>geoJSON;

    if (buildingBBox === null) {
        return null;
    }

    const filteredFeatures = featureCollection.features.filter((f) => isFeatureValidAndInsideCurrentBuilding(f, buildingBBox));

    //create a new object to avoid to original GeoJSON object to be modified
    return {type: "FeatureCollection", features: filteredFeatures} as GeoJSON.FeatureCollection<any>;
}


function isFeatureValidAndInsideCurrentBuilding(feature: GeoJSON.Feature<any>, buildingBBox: LatLngBounds) {
    if (feature.properties === undefined || feature.properties.level === undefined) {
        return false;
    }

    return isFeatureInsideCurrentBuilding(feature.geometry.coordinates, buildingBBox);
}

function isFeatureInsideCurrentBuilding(featureCoordinates: Position[][] | Position[] | Position, buildingBBox: LatLngBounds): boolean {
    switch (getArrayDepth(featureCoordinates)) {
        case 1:
            featureCoordinates = <Position>featureCoordinates;
            const latLng = new LatLng(featureCoordinates[0], featureCoordinates[1]);
            return buildingBBox.contains(latLng);
        case 2:
            featureCoordinates = <Position[]>featureCoordinates;
            return featureCoordinates.some((fc: Position) => {
                const latLng = new LatLng(fc[0], fc[1]);
                return buildingBBox.contains(latLng);
            });
        case 3:
            featureCoordinates = <Position[][]>featureCoordinates;
            return featureCoordinates.some((fc: Position[]) => {
                return fc.some((fc2: Position) => {
                    const latLng = new LatLng(fc2[0], fc2[1]);
                    return buildingBBox.contains(latLng);
                });
            });
    }
}


function getArrayDepth(value: any[]): number {
    return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0;
}
