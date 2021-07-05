import {overpassUrl} from "./constants";
import {loading, loadingEnd, loadingError} from "./_loading_indicator";
import osmtogeojson from "osmtogeojson";
import {filterGeoJsonData} from "./_filterGeoJsonData";
import {createLevelControl} from "./_levelControl";

const overpassInitialQuery = '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;';

let indoorDataXML, indoorDataGeoJSON;

function getOverpassData(callback) {
    loading();

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            loadingEnd();

            if (xhr.status === 200) {
                indoorDataXML = xhr.responseXML
                indoorDataGeoJSON = osmtogeojson(indoorDataXML, {});
                indoorDataGeoJSON = filterGeoJsonData(indoorDataGeoJSON, callback);
            } else if (xhr.status > 400) {
                loadingError();
            }
        }
    };

    // overpassUrl + overpassInitialQuery ######HACK for local dev!!!!
    xhr.open('GET', 'https://localhost:8081/osm.xml', true);
    xhr.send();
}

export {getOverpassData, indoorDataXML, indoorDataGeoJSON};
