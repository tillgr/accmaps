import { GeoJSON } from "leaflet";

import { IndoorLayer } from "../components/indoorLayer";
import { AccessibilityService } from "./accessibilityService";
import { DescriptionArea } from "../components/ui/descriptionArea";

import { INDOOR_LEVEL } from "./data/constants";
import { BuildingService } from "./buildingService";
import { getCurrentLevel, render } from "../components/ui/levelControl";

/*let currentLevel: string;*/
/*const currentLevel = INDOOR_LEVEL;*/
/*let currentLevel = getCurrentLevel();*/
/*let allLevelNames: Array<string>;*/
const allLevelNames = new Array<string>();
/*let geoJSONByLevel: Map<string, GeoJSON.FeatureCollection<any, any>>;*/
const geoJSONByLevel = new Map<string, any>();
let currentBuildingIndoorData: any;
let indoorLayer: IndoorLayer;

export const LevelService = {
  /*create(): void {
    /!*currentLevel = INDOOR_LEVEL;*!/
    /!*allLevelNames = new Array<string>();*!/
    /!*geoJSONByLevel = new Map<string, any>();*!/

    _getAllLevelNamesFromGeoJSON();
    //TODO call in map comoponent
    indoorLayer = new IndoorLayer(LevelService.getCurrentLevelGeoJSON());
    const levelNames = _getAllLevelNamesFromGeoJSON();
    render(levelNames);
  },*/

  getCurrentLevelGeoJSON: function (): GeoJSON.FeatureCollection<any> {
    const currentLevel = getCurrentLevel();

    if (geoJSONByLevel.get(currentLevel) !== undefined) {
      return geoJSONByLevel.get(currentLevel);
    }
    currentBuildingIndoorData = BuildingService.getBuildingGeoJSON();

    const levelFilteredFeatures =
      currentBuildingIndoorData.features.filter(filterByLevelFilter);
    const levelFilteredFeatureCollection: GeoJSON.FeatureCollection<any, any> =
      {
        type: "FeatureCollection",
        features: levelFilteredFeatures,
      };

    geoJSONByLevel.set(currentLevel, levelFilteredFeatureCollection);
    return levelFilteredFeatureCollection;
  },

  //TODO mixed responsibilities
  /*changeCurrentLevel(newLevel: string): void {
    currentLevel = newLevel;
    indoorLayer.updateLayer(LevelService.getCurrentLevelGeoJSON());
    updateCurrentLevelDescription();
  },*/

  //TODO move to levelControl component
  /*remove(): void {
    document.getElementById("levelControl").innerHTML = "";

    if (indoorLayer) {
      indoorLayer.removeIndoorLayerFromMap();
    }
  },
  //TODO move to levelControl component*/
  /*reCreate(): void {
    AccessibilityService.reset();
    LevelService.remove();
    LevelService.create();
  },*/
};

export function getLevels(level: string): string[] {
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
    maxLevel = parseInt(level.slice(firstDash + 1, level.length));
  } else if (dashCount === 2) {
    // [-1-5]
    minLevel = parseInt(level.slice(0, secondDash));
    maxLevel = parseInt(level.slice(secondDash + 1, level.length));
  } else if (dashCount === 3) {
    // [-1--5] or [-5--1]
    minLevel = parseInt(level.slice(0, secondDash));
    maxLevel = parseInt(level.slice(thirdDash, level.length));

    if (minLevel > maxLevel) {
      [minLevel, maxLevel] = [maxLevel, minLevel];
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

//TODO refactor
export function _getAllLevelNamesFromGeoJSON(): string[] {
  currentBuildingIndoorData = BuildingService.getBuildingGeoJSON();

  currentBuildingIndoorData.features.map(
    (feature: GeoJSON.Feature<any, any>) => {
      if (Array.isArray(feature.properties.level)) {
        return;
      }

      const level = (feature.properties.level =
        feature.properties.level.trim());

      if (level.includes(";")) {
        feature.properties.level = level.split(";");
      } else if (level.includes("-")) {
        feature.properties.level = getLevels(level);
      }

      if (Array.isArray(feature.properties.level)) {
        feature.properties.level.forEach((level: string) => {
          if (!allLevelNames.includes(level)) {
            allLevelNames.push(level);
          }
        });
      } else {
        if (!allLevelNames.includes(level)) {
          allLevelNames.push(feature.properties.level);
        }
      }
    }
  );
  allLevelNames.sort();

  return allLevelNames;
}

function filterByLevelFilter(feature: GeoJSON.Feature<any>): boolean {
  const currentLevel = getCurrentLevel();
  return (
    feature.properties.level === currentLevel ||
    feature.properties.level.includes(currentLevel)
  );
}

export function updateCurrentLevelDescription(): void {
  const currentLevel = getCurrentLevel();
  const levelAccessibilityInformation = AccessibilityService.getForLevel(
    currentLevel,
    LevelService.getCurrentLevelGeoJSON()
  );
  DescriptionArea.update(
    "Current level: " + currentLevel + " " + levelAccessibilityInformation
  );
}

//TODO create export default object
