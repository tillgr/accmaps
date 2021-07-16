import osmtogeojson from "osmtogeojson";

// get all indoor data from Dresden
const overpassIndoorQuery = '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;';
const overpassBuildingQuery = '(area["name"="Dresden"];)->.a;(nwr[building][min_level](area.a););(._;>;); out;'

let overpassData = {
    'indoorDataGeoJSON': null,
    'buildingDataGeoJSON': null
};

export class OverpassData {
    static fetchOverpassData() {
        return Promise.all([this._fetchIndoorData(), this._fetchBuildingData()]).then((values) => {
            overpassData.indoorDataGeoJSON = values[0];
            overpassData.buildingDataGeoJSON = values[1];
            return true;
        });
    }

    static _fetchIndoorData() {
        return this.getOverpassData(overpassIndoorQuery)
    }

    static _fetchBuildingData() {
        return this.getOverpassData(overpassBuildingQuery);
    }

    static getOverpassData(query) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let returnValue = osmtogeojson(xhr.responseXML, {});
                        resolve(returnValue);
                    } else if (xhr.status > 400) {
                        reject('an error occurred.');
                    }
                }
            };
            // overpassUrl + overpassInitialQuery ######HACK for local dev!!!!
            xhr.open('GET', '/osm.xml', true);
            xhr.send();
        });
    }

    static getIndoorData() {
        return overpassData['indoorDataGeoJSON'];
    }

    static getBuildingData() {
        return overpassData['buildingDataGeoJSON'];
    }
}
