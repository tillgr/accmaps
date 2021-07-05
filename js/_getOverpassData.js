import osmtogeojson from "osmtogeojson";
import {filterGeoJsonData} from "./_filterGeoJsonData";

const overpassInitialQuery = '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;';

let indoorDataXML, indoorDataGeoJSON;

function getOverpassData(callback) {
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    indoorDataXML = xhr.responseXML
                    indoorDataGeoJSON = osmtogeojson(indoorDataXML, {});
                    indoorDataGeoJSON = filterGeoJsonData(indoorDataGeoJSON);
                    resolve(indoorDataGeoJSON);

                } else if (xhr.status > 400) {
                    reject('an error occured.');
                }
            }
        };
        // overpassUrl + overpassInitialQuery ######HACK for local dev!!!!
        xhr.open('GET', 'https://localhost:8081/osm.xml', true);
        xhr.send();
    });
}

export {getOverpassData, indoorDataXML, indoorDataGeoJSON};
