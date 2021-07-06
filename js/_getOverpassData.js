import osmtogeojson from "osmtogeojson";

const overpassInitialQuery = '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;';

let indoorDataOverpassXML, indoorDataOverpassGeoJSON;

function getOverpassData(callback) {
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    indoorDataOverpassXML = xhr.responseXML
                    indoorDataOverpassGeoJSON = osmtogeojson(indoorDataOverpassXML, {});
                    resolve(indoorDataOverpassGeoJSON);

                } else if (xhr.status > 400) {
                    reject('an error occured.');
                }
            }
        };
        // overpassUrl + overpassInitialQuery ######HACK for local dev!!!!
        xhr.open('GET', '/osm.xml', true);
        xhr.send();
    });
}

export {getOverpassData, indoorDataOverpassXML, indoorDataOverpassGeoJSON};
