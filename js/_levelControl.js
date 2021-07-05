import {indoorDataGeoJSON} from "./_getOverpassData";
import {INDOOR_LEVEL} from "./constants";
import {clearIndoorLayer, drawIndoorLayer} from "./_indoorLayer";

let currentLevel = INDOOR_LEVEL;
let allLevels = new Set();
let geoJSONByLevel = [];

function getCurrentLevelGeoJSON() {
    if (geoJSONByLevel[currentLevel] !== undefined) {
        return geoJSONByLevel[currentLevel];
    }

    let tmpIndoorDataGeoJSON = indoorDataGeoJSON;
    tmpIndoorDataGeoJSON.features.filter((feature) => {
        return feature.properties.level.includes(currentLevel);
    });

    return geoJSONByLevel[currentLevel] = tmpIndoorDataGeoJSON;
}

function changeCurrentLevel(newLevel) {
    currentLevel = newLevel;
    clearIndoorLayer();
}

function createLevelControl() {
    const levelControl = document.getElementById('levelControl');

    allLevels.forEach(level => {
        const newLevelBtn = document.createElement('a');
        newLevelBtn.className = 'btn';
        newLevelBtn.innerText = level;
        newLevelBtn.addEventListener('click', () => {
            changeCurrentLevel(level)
        });
        levelControl.appendChild(newLevelBtn);
    });
}

function getLevelsFromGeoJSON() {
    indoorDataGeoJSON.features.map(generateLevelDescriptorAndAddToLevelList);
}

function generateLevelDescriptorAndAddToLevelList(feature) {
    let levelList = feature.properties.level.split(";");

    feature.properties.level = levelList;

    levelList.forEach((listItem) => {
        allLevels.add(listItem.trim());
    });

    return feature;
}

function cleanUpLevelNames(level) {
    let dashCount = 0;
    let finalArray = [];
    let minLevel = 0;
    let maxLevel = 0;

    let firstDash = -1;
    let secondDash = -1;
    let thirdDash = -1;

    for (let i = 0; i < level.length; i++) {
        if (level.charAt(i) === "-") {
            dashCount++;

            if (firstDash === -1) {
                firstDash = i;
            } else if (secondDash === -1) {
                secondDash = i;
            } else if (thirdDash === -1) {
                thirdDash = i;
            }
        }
    }
    if (dashCount === 1 && firstDash !== 0) // [0-5] but not [-5]
    {
        minLevel = parseInt(level.slice(0, firstDash));
        maxLevel = parseInt(level.slice(firstDash + 1, level.length))
    } else if (dashCount === 2) // [-1-5]
    {
        minLevel = parseInt(level.slice(0, secondDash));
        maxLevel = parseInt(level.slice(secondDash + 1, level.length));
    } else if (dashCount === 3) // [-1--5] or [-5--1]
    {
        minLevel = parseInt(level.slice(0, secondDash));
        maxLevel = parseInt(level.slice(thirdDash, level.length));

        if (minLevel > maxLevel)  // [-1--5]
        {
            minLevel = [maxLevel, maxLevel = minLevel][0]
        }
    }

    if (level.charAt(0) !== "-" || dashCount > 1) // not [-5]
    {
        for (let i = minLevel; i <= maxLevel; i++) {
            finalArray.push(i);
        }
    }

    return finalArray;
}

export {getLevelsFromGeoJSON, getCurrentLevelGeoJSON, createLevelControl}
