import { OVERPASS_DATA_URLS } from "../data/constants";
import { GeoJSON } from "leaflet";

let indoorDataGeoJSON: GeoJSON.FeatureCollection<any, any>;
let buildingDataGeoJSON: GeoJSON.FeatureCollection<any, any>;

export const HttpService = {
  fetchOverpassData(): Promise<boolean> {
    return Promise.all([fetchIndoorData(), fetchBuildingData()]).then(
      (
        values: [
          GeoJSON.FeatureCollection<any, any>,
          GeoJSON.FeatureCollection<any, any>
        ]
      ) => {
        indoorDataGeoJSON = values[0];
        buildingDataGeoJSON = values[1];
        return true;
      }
    );
  },

  getIndoorData(): GeoJSON.FeatureCollection<any, any> {
    return indoorDataGeoJSON;
  },

  getBuildingData(): GeoJSON.FeatureCollection<any, any> {
    return buildingDataGeoJSON;
  },
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
          reject(
            "An error occurred while fetching building data: " + xhr.statusText
          );
        }
      }
    };

    xhr.open("GET", overpassQuery, true);
    xhr.send();
  });
}

//TODO create export default object
