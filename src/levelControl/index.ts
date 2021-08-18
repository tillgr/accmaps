import {GeoJSON} from "leaflet";

import {IndoorLayer} from "../indoorLayer";
import {LevelInformation} from "./_levelInformation";
import {DescriptionPopup} from "../ui/_descriptionPopup";
import {BuildingControl} from "../buildingControl";

import {INDOOR_LEVEL} from "../data/constants";
import {getLevelsFromLevelString} from "./_getLevelsFromLevelString";

let currentLevel: string;
let allLevels: Array<string>;
let geoJSONByLevel: Map<string, GeoJSON.FeatureCollection<any, any>>;
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

    getCurrentLevelGeoJSON: function (): GeoJSON.FeatureCollection<any> {
        if (geoJSONByLevel.get(currentLevel) !== undefined) {
            return geoJSONByLevel.get(currentLevel);
        }

        const levelFilteredFeatures = currentBuildingIndoorData.features.filter(filterByLevel);
        const levelFilteredFeatureCollection: GeoJSON.FeatureCollection<any, any> = {
            type: 'FeatureCollection',
            features: levelFilteredFeatures
        };

        geoJSONByLevel.set(currentLevel, levelFilteredFeatureCollection);

        return geoJSONByLevel.get(currentLevel);
    },

    changeCurrentLevel(newLevel: string): void {
        currentLevel = newLevel;
        indoorLayer.updateLayer(LevelControl.getCurrentLevelGeoJSON());
        updateCurrentLevelDescription()
    },

    remove(): void {
        document.getElementById('levelControl').innerHTML = '';

        if (indoorLayer) {
            indoorLayer.removeIndoorLayerFromMap();
        }
    },

    reCreate() {
        LevelControl.remove();
        LevelControl.create();
    }
}

function filterByLevel(feature: GeoJSON.Feature<any>): boolean {
    return (feature.properties.level === currentLevel || feature.properties.level.includes(currentLevel))
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

        const level = feature.properties.level = feature.properties.level.trim();

        if (level.includes(";")) {
            feature.properties.level = level.split(";");
        } else if (level.includes("-")) {
            feature.properties.level = getLevelsFromLevelString(level);
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
    const levelProperties = LevelInformation.getForLevel(currentLevel, LevelControl.getCurrentLevelGeoJSON());

    let accessibilityInformation = '';
    accessibilityInformation += (levelProperties['accessibleToilets']) ? 'there are accessible toilets' : 'no accessible toilets available';
    // todo: ...

    DescriptionPopup.update('current level: ' + currentLevel + ', ' + accessibilityInformation);
}
