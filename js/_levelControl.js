import {indoorDataGeoJSON} from "./_getOverpassData";
import {INDOOR_LEVEL} from "./constants";
import {buildingLevels} from "./_filterGeoJsonData";

let currentLevel = INDOOR_LEVEL;
let geoJSONByLevel = [];

function getCurrentLevelGeoJSON() {
    if (geoJSONByLevel === []) {
        createLevelControl();
    }
    if (geoJSONByLevel[currentLevel] !== undefined) {
        return geoJSONByLevel[currentLevel];
    }

    let tmpIndoorDataGeoJSON = indoorDataGeoJSON;
    tmpIndoorDataGeoJSON.features.filter((feature) => feature.properties.level === currentLevel);

    return geoJSONByLevel[currentLevel] = tmpIndoorDataGeoJSON;
}

function changeCurrentLevel(newLevel) {
    currentLevel = newLevel;
}

function createLevelControl() {
    const levelControl = document.getElementById('levelControl');

    buildingLevels.forEach(level => {
        levelControl.appendChild(document.createElement('a').appendChild(document.createTextNode(level)));
    });
}


export {getCurrentLevelGeoJSON, createLevelControl};
