import osmtogeojson from "osmtogeojson";
import {GeoJSON} from "leaflet";

// get all indoor data from Dresden
const overpassIndoorQuery = '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;';

// get all buildings that conform the SIT standard (min_level tag is set)
const overpassBuildingQuery = '(area["name"="Dresden"];)->.a;(nwr[building][min_level](area.a););(._;>;); out;'

let indoorDataGeoJSON: GeoJSON.FeatureCollection<any>;
let buildingDataGeoJSON: GeoJSON.FeatureCollection<any>;

export const OverpassData = {
    fetchOverpassData(): Promise<boolean> {
        return Promise.all([fetchIndoorData(), fetchBuildingData()]).then((values: [GeoJSON.FeatureCollection<any>, GeoJSON.FeatureCollection<any>]) => {
            indoorDataGeoJSON = values[0];
            buildingDataGeoJSON = values[1];
            return true;
        });
    },

    getIndoorData(): GeoJSON.FeatureCollection<any> {
        return indoorDataGeoJSON;
    },

    getBuildingData(): GeoJSON.FeatureCollection<any> {
        return buildingDataGeoJSON;
    }
};


function fetchIndoorData() {
    return getOverpassData('/osm.xml'); //overpassUrl + overpassIndoorQuery
}

function fetchBuildingData() {
    return getOverpassData('/buildings.xml'); //overpassUrl + overpassBuildingQuery
}

function getOverpassData(query: string) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let returnValue = osmtogeojson(xhr.responseXML);
                    resolve(returnValue);
                } else if (xhr.status > 400) {
                    reject('an error occurred.');
                }
            }
        };

        xhr.open('GET', query, true);
        xhr.send();
    });
}
