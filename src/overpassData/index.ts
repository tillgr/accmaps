import {GeoJsonObject} from "geojson";
import {OVERPASS_DATA_URLS} from "../data/constants";

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
    return getOverpassData(OVERPASS_DATA_URLS.INDOOR);
}

function fetchBuildingData() {
    return getOverpassData(OVERPASS_DATA_URLS.BUILDINGS);
}

function getOverpassData(overpassQuery: string) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const returnValue = JSON.parse(xhr.responseText);
                    resolve(returnValue);
                } else if (xhr.status > 400) {
                    reject('An error occurred while fetching building data: ' + xhr.statusText);
                }
            }
        };

        xhr.open('GET', overpassQuery, true);
        xhr.send();
    });
}
