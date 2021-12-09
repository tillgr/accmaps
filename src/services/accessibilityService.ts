import { GeoJSON } from "leaflet";
import { levelAccessibilityProperties } from "./data/levelAccessibilityProperties";
import { UserService } from "./userService";

const propertiesByLevel: Map<string, string> = new Map<string, string>();

export const AccessibilityService = {
  //AccessibilityInformation
  getForLevel(
    level: string,
    featureCollection: GeoJSON.FeatureCollection<any, any>
  ): string {
    if (propertiesByLevel.get(level) !== undefined) {
      return propertiesByLevel.get(level);
    }

    propertiesByLevel.set(
      level,
      this.getAccessibilityInformation(featureCollection.features)
    );
    return propertiesByLevel.get(level);
  },

  reset(): void {
    propertiesByLevel.clear();
  },

  getAccessibilityInformation(
    geoJSONFeatures: GeoJSON.Feature<any, any>[]
  ): string {
    let returnString = "[";

    levelAccessibilityProperties.forEach((levelAccessibilityProperty) => {
      if (!levelAccessibilityProperty.userGroups.includes(UserService.get())) {
        return; // only show properties for currently selected user profile
      }

      const foundAccessibilityFeature = geoJSONFeatures.some(
        (feature: GeoJSON.Feature<any, any>) => {
          return levelAccessibilityProperty.accessibilityFunction(feature);
        }
      );

      if (foundAccessibilityFeature) {
        returnString += levelAccessibilityProperty.msgTrue;
      } else {
        returnString += levelAccessibilityProperty.msgFalse;
      }
      returnString += ", ";
    });

    //remove last comma
    returnString = returnString.slice(0, -2) + "]";
    return returnString;
  },
};
