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

    tmpIndoorDataGeoJSON.features = tmpIndoorDataGeoJSON.features.filter((f) => f.properties.level.includes(currentLevel));
    geoJSONByLevel[currentLevel] = tmpIndoorDataGeoJSON;

    return geoJSONByLevel[currentLevel];
}

function changeCurrentLevel(newLevel) {
    currentLevel = newLevel;
    clearIndoorLayer();
    drawIndoorLayer();
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
    let level = feature.properties.level = feature.properties.level.trim();

    if (level.includes(";")) {
        feature.properties.level = level.split(";");
    } else if (level.includes("-")) {
        let i;
        let dashCount = 0;
        const finalArray = [];
        let minLevel = 0;
        let maxLevel = 0;

        let firstDash = -1;
        let secondDash = -1;
        let thirdDash = -1;

        for (i = 0; i < level.length; i++) {
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
            minLevel = parseInt(level.slice(0, firstDash).trim());
            maxLevel = parseInt(level.slice(firstDash + 1, level.length).trim())
        } else if (dashCount === 2) // [-1-5]
        {
            minLevel = parseInt(level.slice(0, secondDash).trim());
            maxLevel = parseInt(level.slice(secondDash + 1, level.length).trim());
        } else if (dashCount === 3) // [-1--5] or [-5--1]
        {
            minLevel = parseInt(level.slice(0, secondDash).trim());
            maxLevel = parseInt(level.slice(thirdDash, level.length).trim());

            if (minLevel > maxLevel) // [-1--5]
            {
                var tempMin = minLevel;
                minLevel = maxLevel;
                maxLevel = tempMin;
            }
        }

        if (level.charAt(0) !== "-" || dashCount > 1) // not [-5]
        {
            for (i = minLevel; i <= maxLevel; i++) {
                finalArray.push(i);
            }
        }
        feature.properties.level = finalArray;
    }

    if (Array.isArray(feature.properties.level)) {
        feature.properties.level.forEach((level) => {
            allLevels.add(level);
        });
    } else {
        allLevels.add(feature.properties.level);
    }
}

export {getLevelsFromGeoJSON, getCurrentLevelGeoJSON, createLevelControl}
