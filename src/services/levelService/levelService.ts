import { GeoJSON } from "leaflet";

import { IndoorLayer } from "../../components/indoorLayer";
import { LevelAccessibilityInformation } from "./_levelAccessibilityInformation";
import { DescriptionArea } from "../../components/ui/descriptionArea";

import { INDOOR_LEVEL } from "../data/constants";
import { getLevelsFromLevelString } from "./_getLevelsFromLevelString";
import { createLevelControlButtons } from "./_createLevelControlButtons";
import { BuildingService } from "../buildingService";

let currentLevel: string;
let allLevelNames: Array<string>;
let geoJSONByLevel: Map<string, GeoJSON.FeatureCollection<any, any>>;
let currentBuildingIndoorData: any;
let indoorLayer: IndoorLayer;

export const LevelService = {
  create(): void {
    currentLevel = INDOOR_LEVEL;
    allLevelNames = new Array<string>();
    geoJSONByLevel = new Map<string, any>();
    currentBuildingIndoorData = BuildingService.getBuildingGeoJSON();

    indoorLayer = new IndoorLayer(LevelService.getCurrentLevelGeoJSON());
    _getAllLevelNamesFromGeoJSON();
    createLevelControlButtons(allLevelNames);
  },

  getCurrentLevelGeoJSON: function (): GeoJSON.FeatureCollection<any> {
    if (geoJSONByLevel.get(currentLevel) !== undefined) {
      return geoJSONByLevel.get(currentLevel);
    }

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

  //TODO gemischte verantwortlichkeiten
  changeCurrentLevel(newLevel: string): void {
    currentLevel = newLevel;
    indoorLayer.updateLayer(LevelService.getCurrentLevelGeoJSON());
    updateCurrentLevelDescription();
  },

  //TODO levels componente extrahieren
  remove(): void {
    document.getElementById("levelControl").innerHTML = "";

    if (indoorLayer) {
      indoorLayer.removeIndoorLayerFromMap();
    }
  },

  reCreate(): void {
    LevelAccessibilityInformation.reset();
    LevelService.remove();
    LevelService.create();
  },
};

function _getAllLevelNamesFromGeoJSON(): void {
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
        feature.properties.level = getLevelsFromLevelString(level);
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
}

function filterByLevelFilter(feature: GeoJSON.Feature<any>): boolean {
  return (
    feature.properties.level === currentLevel ||
    feature.properties.level.includes(currentLevel)
  );
}

function updateCurrentLevelDescription(): void {
  const levelAccessibilityInformation =
    LevelAccessibilityInformation.getForLevel(
      currentLevel,
      LevelService.getCurrentLevelGeoJSON()
    );
  DescriptionArea.update(
    "Current level: " + currentLevel + " " + levelAccessibilityInformation
  );
}