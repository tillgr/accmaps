import {GeoJSON} from "leaflet";

import {IndoorLayer} from "./_indoorLayer";
import {LevelInformation} from "./_levelInformation";
import {DescriptionPopup} from "./_descriptionPopup";
import {BuildingControl} from "./_buildingControl";

import {INDOOR_LEVEL} from "./constants";

let currentLevel: string;
let allLevels: Array<string>;
let geoJSONByLevel: Map<string, any>;
let currentBuildingIndoorData: any;
let indoorLayer: IndoorLayer;

export const LevelControl = {
    create(): void {
        currentLevel = INDOOR_LEVEL;
        allLevels = new Array<string>();
        geoJSONByLevel = new Map<string, any>();
        currentBuildingIndoorData = BuildingControl.getCurrentBuildingGeoJSON();

        indoorLayer = new IndoorLayer(LevelControl.getCurrentLevelGeoJSON());
        createLevelControlButtons();
    },

    getCurrentLevelGeoJSON(): GeoJSON.FeatureCollection<any> {
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

    remove(): void {
        document.getElementById('levelControl').innerHTML = '';
        indoorLayer.removeIndoorLayerFromMap();
    }
}

function filterByLevel(feature: GeoJSON.Feature<any>): boolean {
    return (feature.properties.level === currentLevel || feature.properties.level.includes(currentLevel))
}

function _getLevelRange(level: string): string[] {
    const finalArray = [];

    let dashCount = 0;
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
    if (dashCount === 1 && firstDash !== 0) {
        // [0-5] but not [-5]
        minLevel = parseInt(level.slice(0, firstDash));
        maxLevel = parseInt(level.slice(firstDash + 1, level.length))
    } else if (dashCount === 2) {
        // [-1-5]
        minLevel = parseInt(level.slice(0, secondDash));
        maxLevel = parseInt(level.slice(secondDash + 1, level.length));
    } else if (dashCount === 3) {
        // [-1--5] or [-5--1]
        minLevel = parseInt(level.slice(0, secondDash));
        maxLevel = parseInt(level.slice(thirdDash, level.length));

        if (minLevel > maxLevel) {
            // [-1--5]
            let tempMin = minLevel;
            minLevel = maxLevel;
            maxLevel = tempMin;
        }
    }
    if (level.charAt(0) !== "-" || dashCount > 1) {
        // not [-5]
        for (let i = minLevel; i <= maxLevel; i++) {
            finalArray.push(i.toString());
        }
    }
    return finalArray;
}

function createLevelControlButtons(): void {
    _getAllLevelsFromGeoJSON();

    const levelControl = document.getElementById('levelControl');

    allLevels.forEach((level: string) => {
        const changeToLevel = 'change to level ' + level;
        const levelBtn = document.createElement('li');
        levelBtn.className = 'waves-effect';
        levelBtn.innerHTML = '<a>' + level + '</a>'; //todo: proper solution
        levelBtn.setAttribute('role', 'button');
        levelBtn.setAttribute('title', changeToLevel);
        levelBtn.setAttribute('aria-label', changeToLevel);

        if (level == INDOOR_LEVEL) {
            levelBtn.classList.add('active');
        }

        levelBtn.addEventListener('click', (e: MouseEvent) => {
            LevelControl.changeCurrentLevel(level);

            for (let i = 0; i < levelControl.children.length; i++) {
                levelControl.children[i].classList.remove('active');
            }
            (<HTMLElement>e.target).parentElement.classList.add('active');
        });

        levelControl.appendChild(levelBtn);
    });

    levelControl.classList.add('scale-in');
}

function _getAllLevelsFromGeoJSON(): void {
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
                if (!allLevels.includes(level)) {
                    allLevels.push(level);
                }
            });
        } else {
            if (!allLevels.includes(level)) {
                allLevels.push(feature.properties.level);
            }
        }
    });
    allLevels.sort();
}

function updateCurrentLevelDescription(): void {
    const levelProperties = LevelInformation.getPropertiesForLevel(currentLevel, LevelControl.getCurrentLevelGeoJSON());
    let accessibilityInformation = '';
    accessibilityInformation += (levelProperties['accessibleToilets']) ? 'there are accessible toilets' : 'no accessible toilets available';
    // todo: ...

    DescriptionPopup.update('current level: ' + currentLevel + ', ' + accessibilityInformation);
}
