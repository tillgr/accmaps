import {GeoJsonObject} from "geojson";
import osmtogeojson from "osmtogeojson";

let indoorDataGeoJSON: GeoJsonObject;
let buildingDataGeoJSON: GeoJsonObject;

export const OverpassData = {
    fetchOverpassData(): Promise<boolean> {
        return Promise.all([fetchIndoorData(), fetchBuildingData()]).then((values: [GeoJsonObject, GeoJsonObject]) => {
            indoorDataGeoJSON = values[0];
            buildingDataGeoJSON = values[1];
            return true;
        });
    },

    getIndoorData(): GeoJsonObject {
        return indoorDataGeoJSON;
    },

    getBuildingData(): GeoJsonObject {
        return buildingDataGeoJSON;
    }
};

function fetchIndoorData() {
    return getOverpassData('/osm.xml');
}

function fetchBuildingData() {
    return getOverpassData('/buildings.xml');
}

function getOverpassData(overpassQuery: string) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const returnValue = osmtogeojson(xhr.responseXML);
                    resolve(returnValue);
                } else if (xhr.status > 400) {
                    reject('An error occurred while fetching building data: ' + xhr.statusText);
                }
            }
        };

        xhr.open('GET', overpassQuery, true); //todo: correctly use overpass url here
        xhr.send();
    });
}
