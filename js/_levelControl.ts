import {GeoJSON} from "leaflet";

import {filterGeoJsonData} from "./_filterGeoJsonData";
import {IndoorLayer} from "./_indoorLayer";
import {LevelInformation} from "./_levelInformation";
import {OverpassData} from "./_overpassData";
import {DescriptionPopup} from "./_descriptionPopup";


import {INDOOR_LEVEL} from "./constants";

let currentLevel: string;
let allLevels: Set<string>;
let geoJSONByLevel: Map<string, any>;
let currentBuildingIndoorData: any;
let indoorLayer: IndoorLayer;

export const LevelControl = {
    create() {
        currentLevel = INDOOR_LEVEL;
        allLevels = new Set<string>();
        geoJSONByLevel = new Map<string, any>();
        currentBuildingIndoorData = filterGeoJsonData(OverpassData.getIndoorData());

        indoorLayer = new IndoorLayer(LevelControl.getCurrentLevelGeoJSON());
        createLevelControlButtons();
    },

    getCurrentLevelGeoJSON() {
        if (geoJSONByLevel.get(currentLevel) !== undefined) {
            return geoJSONByLevel.get(currentLevel);
        }

        const levelFilteredFeatureCollection = currentBuildingIndoorData.features.filter(filterByLevel);
        geoJSONByLevel.set(currentLevel, levelFilteredFeatureCollection);

        return geoJSONByLevel.get(currentLevel);
    },

    changeCurrentLevel(newLevel: string) {
        currentLevel = newLevel;
        indoorLayer.updateLayer(LevelControl.getCurrentLevelGeoJSON());
        updateCurrentLevelDescription()
    },

    remove() {
        document.getElementById('levelControl').innerHTML = '';
        indoorLayer.removeIndoorLayerFromMap();
    }
}

function filterByLevel(feature: GeoJSON.Feature<any>): boolean {
    return (feature.properties.level === currentLevel || feature.properties.level.includes(currentLevel))
}

function _getLevelRange(level: string) {
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

        if (minLevel > maxLevel) // [-1--5]
        {
            let tempMin = minLevel;
            minLevel = maxLevel;
            maxLevel = tempMin;
        }
    }
    if (level.charAt(0) !== "-" || dashCount > 1) // not [-5]
    {
        for (i = minLevel; i <= maxLevel; i++) {
            finalArray.push(i.toString());
        }
    }
    return finalArray;
}

function createLevelControlButtons() {
    _getAllLevelsFromGeoJSON();

    const levelControl = document.getElementById('levelControl');

    allLevels.forEach((level: string) => {
        const changeToLevel = 'change to level ' + level;
        const levelBtn = document.createElement('a');
        levelBtn.className = 'btn';
        levelBtn.innerText = level;
        levelBtn.setAttribute('role', 'button');
        levelBtn.setAttribute('title', changeToLevel);
        levelBtn.setAttribute('aria-label', changeToLevel);

        levelBtn.addEventListener('click', () => {
            LevelControl.changeCurrentLevel(level)
        });

        levelControl.appendChild(levelBtn);
    });

    levelControl.classList.add('scale-in');
}

function _getAllLevelsFromGeoJSON() {
    currentBuildingIndoorData.features.map((feature: GeoJSON.Feature<any, any>) => {
        if (Array.isArray(feature.properties.level)) {
            return;
        }

        let level = feature.properties.level = feature.properties.level.trim();

        if (level.includes(";")) {
            feature.properties.level = level.split(";");
        } else if (level.includes("-")) {
            feature.properties.level = _getLevelRange(level);
        }

        if (Array.isArray(feature.properties.level)) {
            feature.properties.level.forEach((level: string) => {
                allLevels.add(level);
            });
        } else {
            allLevels.add(feature.properties.level);
        }
    });
}

function updateCurrentLevelDescription() {
    const levelProperties = LevelInformation.getPropertiesForLevel(currentLevel, LevelControl.getCurrentLevelGeoJSON());
    let accessibilityInformation = '';
    accessibilityInformation += (levelProperties['accessibleToilets']) ? 'there are accessible toilets' : 'no accessible toilets available';
    // todo: ...

    DescriptionPopup.update('current level: ' + currentLevel + ', ' + accessibilityInformation);
}
