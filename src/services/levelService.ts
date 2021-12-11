import { GeoJSON } from "leaflet";
import { AccessibilityService } from "./accessibilityService";
import { DescriptionArea } from "../components/ui/descriptionArea";
import { BuildingService } from "./buildingService";
import { getCurrentLevel } from "../components/ui/levelControl";
import { extractLevels } from "../utils/extractLevels";
import { hasCurrentLevel } from "../utils/hasCurrentLevel";

const geoJSONByLevel = new Map<string, any>();
let currentBuildingIndoorData: any;

export const LevelService = {
  getCurrentLevelGeoJSON: function (): GeoJSON.FeatureCollection<any> {
    const currentLevel = getCurrentLevel();

    if (geoJSONByLevel.get(currentLevel) !== undefined) {
      return geoJSONByLevel.get(currentLevel);
    }
    currentBuildingIndoorData = BuildingService.getBuildingGeoJSON();

    const levelFilteredFeatures =
      currentBuildingIndoorData.features.filter(hasCurrentLevel);
    const levelFilteredFeatureCollection: GeoJSON.FeatureCollection<any, any> =
      {
        type: "FeatureCollection",
        features: levelFilteredFeatures,
      };

    geoJSONByLevel.set(currentLevel, levelFilteredFeatureCollection);
    return levelFilteredFeatureCollection;
  },
};

//TODO refactor
export function _getAllLevelNamesFromGeoJSON(): string[] {
  currentBuildingIndoorData = BuildingService.getBuildingGeoJSON();
  const allLevelNames = new Array<string>();

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
        feature.properties.level = extractLevels(level);
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

  return allLevelNames.sort();
}

//TODO move to description area
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
